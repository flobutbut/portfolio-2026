/**
 * Accès aux contenus : un seul endroit pour lire, filtrer, apparier et valider.
 *
 * - Cas et écrits sont appariés entre langues par leur `numero`.
 * - Si une traduction manque, la version disponible est servie à l'adresse de l'autre langue,
 *   sans mention (l'élément porte alors `langue` ≠ langue de la page, pour l'attribut lang).
 * - En production, seuls les contenus `publie` sont retenus, et tout « À compléter » fait échouer le build.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { otherLocale, path, type Locale } from '../i18n/routes';
import { modeApercu } from './mode';
import { cheminsTodo, contientTodo } from './todo';
import { typographier } from './typographie';

type Genre = 'cas' | 'ecrits';

export interface Element<G extends Genre> {
  numero: number;
  /** Langue du contenu (peut différer de la langue de la page en cas de repli) */
  langue: Locale;
  slug: string;
  data: CollectionEntry<G>['data'];
  body: string;
  /** Fichier source, pour les messages d'erreur */
  fichier: string;
  href: string;
  /** Adresse de l'équivalent dans l'autre langue */
  alternate: string;
}

const routeDe = { cas: 'travaux', ecrits: 'ecrits' } as const;

function langueDe(id: string): Locale {
  return id.startsWith('en/') ? 'en' : 'fr';
}

function fichierDe(entry: CollectionEntry<Genre>): string {
  return `content/${entry.id}.md`;
}

async function entrees<G extends Genre>(genre: G) {
  const toutes = (await getCollection(genre)) as CollectionEntry<G>[];
  return toutes.filter((e) => modeApercu || e.data.statut === 'publie');
}

/** Éléments d'un genre pour la langue de page demandée, triés par numéro. */
export async function lister<G extends Genre>(genre: G, locale: Locale): Promise<Element<G>[]> {
  await valider();
  const toutes = await entrees(genre);
  const parNumero = new Map<number, Partial<Record<Locale, CollectionEntry<G>>>>();
  for (const e of toutes) {
    const paire = parNumero.get(e.data.numero) ?? {};
    paire[langueDe(e.id)] = e;
    parNumero.set(e.data.numero, paire);
  }

  const autre = otherLocale(locale);
  return [...parNumero.entries()]
    .sort(([a], [b]) => a - b)
    .map(([numero, paire]) => {
      const entry = (paire[locale] ?? paire[autre])!;
      const langue = langueDe(entry.id);
      const slugIci = entry.data.slug;
      const enFace = paire[autre] ?? entry;
      return {
        numero,
        langue,
        slug: slugIci,
        data: typographier(entry.data, langue),
        body: entry.body ?? '',
        fichier: fichierDe(entry),
        href: path(routeDe[genre], locale, slugIci),
        alternate: path(routeDe[genre], autre, enFace.data.slug),
      };
    });
}

export async function trouver<G extends Genre>(genre: G, locale: Locale, numero: number) {
  return (await lister(genre, locale)).find((e) => e.numero === numero);
}

/** Résout une liste de numéros ; les références absentes ou non publiées sont ignorées. */
export async function resoudre<G extends Genre>(genre: G, locale: Locale, numeros: number[]) {
  const liste = await lister(genre, locale);
  return numeros.flatMap((n) => liste.filter((e) => e.numero === n));
}

async function donnees<C extends 'accueil' | 'parcours' | 'interfaceTextes'>(collection: C, locale: Locale) {
  const nom = collection === 'interfaceTextes' ? 'interface' : collection;
  const entry = await getEntry(collection, `${locale}/${nom}`);
  if (!entry) throw new Error(`Fichier introuvable : content/${locale}/${nom}.yaml`);
  return typographier(entry.data as CollectionEntry<C>['data'], locale);
}

export const getAccueil = (locale: Locale) => donnees('accueil', locale);
export const getParcours = (locale: Locale) => donnees('parcours', locale);
export const getTextesInterface = (locale: Locale) => donnees('interfaceTextes', locale);

/* ---------- Validation de production ---------- */

let validation: Promise<void> | undefined;

/** En production : refuse tout « À compléter » publié et signale les références cassées. */
export function valider(): Promise<void> {
  validation ??= (async () => {
    const erreurs: string[] = [];
    const avertissements: string[] = [];

    if (!modeApercu) {
      for (const genre of ['cas', 'ecrits'] as const) {
        for (const e of await entrees(genre)) {
          const fichier = fichierDe(e);
          for (const champ of cheminsTodo(e.data)) erreurs.push(`${fichier} → ${champ}`);
          if (contientTodo(e.body ?? '')) erreurs.push(`${fichier} → corps du texte`);
        }
      }
      for (const locale of ['fr', 'en'] as const) {
        for (const [collection, nom] of [
          ['interfaceTextes', 'interface'],
          ['accueil', 'accueil'],
          ['parcours', 'parcours'],
        ] as const) {
          const entry = await getEntry(collection, `${locale}/${nom}`);
          for (const champ of cheminsTodo(entry?.data)) erreurs.push(`content/${locale}/${nom}.yaml → ${champ}`);
        }
      }
    }

    // Références entre contenus
    const cas = await entrees('cas');
    const ecrits = await entrees('ecrits');
    const numerosCas = new Set(cas.map((e) => e.data.numero));
    const numerosEcrits = new Set(ecrits.map((e) => e.data.numero));
    for (const e of cas) {
      const f = fichierDe(e);
      for (const n of [...e.data.ecritsLies, ...(e.data.reglesEcrit ? [e.data.reglesEcrit] : [])])
        if (!numerosEcrits.has(n)) avertissements.push(`${f} : l’écrit ${n} n’existe pas ou n’est pas publié (lien masqué)`);
      if (e.data.casSuivant && !numerosCas.has(e.data.casSuivant))
        avertissements.push(`${f} : le cas suivant ${e.data.casSuivant} n’existe pas ou n’est pas publié (lien masqué)`);
    }
    for (const e of ecrits) {
      const f = fichierDe(e);
      for (const n of e.data.ecritsLies)
        if (!numerosEcrits.has(n)) avertissements.push(`${f} : l’écrit ${n} n’existe pas ou n’est pas publié (lien masqué)`);
      for (const n of e.data.casCites)
        if (!numerosCas.has(n)) avertissements.push(`${f} : le cas ${n} n’existe pas ou n’est pas publié (lien masqué)`);
    }

    if (avertissements.length && !import.meta.env.DEV) {
      console.warn(`\n[contenu] ${avertissements.length} référence(s) masquée(s) :\n  ${[...new Set(avertissements)].join('\n  ')}\n`);
    }
    if (erreurs.length) {
      throw new Error(
        `\n[contenu] Build de production refusé : ${erreurs.length} champ(s) « À compléter » dans des contenus publiés.\n  ` +
          erreurs.join('\n  ') +
          `\n\nComplétez ces champs, repassez le contenu en « statut: brouillon », ou construisez un aperçu avec « npm run build:apercu ».\n`,
      );
    }
  })();
  return validation;
}
