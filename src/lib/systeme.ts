/**
 * Design system « Strates » : une seule source pour la page /systeme et ses versions pour les agents
 * (/systeme.md, /systeme.json et leurs équivalents anglais).
 *
 * - Les valeurs des jetons sont lues dans styles/tokens.css, les styles de texte dans styles/global.css.
 * - Les composants sont lus dans src/components/<niveau>/ : niveau, nœuds Figma (commentaire d'en-tête),
 *   propriétés (type, caractère optionnel, valeur par défaut), slots et composants utilisés.
 * - content/<langue>/systeme.yaml n'apporte que le sens : usages, rôles, règles, accessibilité.
 * - validerSysteme() fait échouer le build si la documentation et le code divergent
 *   (jeton, propriété, slot, composant ou gabarit sans description, ou description sans objet).
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/routes';
import { typographier } from './typographie';
import jetonsCss from '../styles/tokens.css?raw';
import globalCss from '../styles/global.css?raw';

export const NIVEAUX = ['atomes', 'molecules', 'organismes'] as const;
export type Niveau = (typeof NIVEAUX)[number];

const sourcesComposants = import.meta.glob('../components/*/*.astro', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;
const sourcesGabarits = import.meta.glob('../gabarits/*.astro', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const sourcesMisesEnPage = import.meta.glob('../layouts/*.astro', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

/** La page Design system montre tous les composants : elle n'est pas comptée parmi leurs utilisateurs. */
const VITRINE = 'Systeme';

/* ---------- Jetons ---------- */

export interface Jeton {
  nom: string;
  valeur: string;
}

/** Déclarations de :root dans tokens.css (le bloc prefers-reduced-motion ne fait que les remettre à zéro). */
export const jetons: Jeton[] = (() => {
  const racine = jetonsCss.slice(jetonsCss.indexOf(':root'), jetonsCss.indexOf('@media'));
  return [...racine.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map(([, nom, valeur]) => ({ nom, valeur: valeur.trim() }));
})();

export const jetonsDe = (prefixe: string) => jetons.filter((j) => j.nom.startsWith(prefixe));
const valeurDe = (nom: string) => jetons.find((j) => j.nom === nom)?.valeur;

/** Résout var(--x) avec les valeurs de tokens.css. */
export const resoudre = (valeur: string): string => valeur.replace(/var\((--[\w-]+)\)/g, (m, nom) => valeurDe(nom) ?? m);

/** Styles de texte de global.css (.text-*), avec leurs déclarations, règles groupées comprises. */
export const stylesTexte: { classe: string; declarations: Record<string, string> }[] = (() => {
  const styles = new Map<string, Record<string, string>>();
  for (const [, selecteurs, corps] of globalCss.matchAll(/((?:\.text-[\w-]+,?\s*)+)\{([^}]*)\}/g)) {
    const declarations = Object.fromEntries([...corps.matchAll(/([\w-]+):\s*([^;]+);/g)].map(([, p, v]) => [p, v.trim()]));
    for (const classe of selecteurs.match(/text-[\w-]+/g) ?? []) styles.set(classe, { ...styles.get(classe), ...declarations });
  }
  return [...styles.entries()].map(([classe, declarations]) => ({ classe, declarations }));
})();

/* ---------- Composants ---------- */

export interface Propriete {
  nom: string;
  type: string;
  obligatoire: boolean;
  defaut?: string;
}

export interface ComposantSource {
  id: string;
  niveau: Niveau;
  fichier: string;
  figma: string[];
  proprietes: Propriete[];
  slots: string[];
  composeDe: string[];
  utilisePar: string[];
}

function analyser(chemin: string, source: string): Omit<ComposantSource, 'utilisePar'> {
  const [, niveau, id] = chemin.match(/components\/(\w+)\/(\w+)\.astro$/)!;
  const entete = source.match(/\/\*\*([\s\S]*?)\*\//)?.[1] ?? '';
  const figma = [...(entete.match(/Figma ([\d:]+(?:, [\d:]+)*)/)?.[1].split(', ') ?? [])];

  const bloc = source.match(/(?:interface Props|type Props =)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const destructuration = source.match(/const \{([\s\S]*?)\}\s*=\s*\n?\s*Astro\.props/)?.[1] ?? '';
  const defauts = Object.fromEntries(
    [...destructuration.matchAll(/(\w+)(?:\s*:\s*\w+)?\s*=\s*('[^']*'|[\w.]+)/g)].map(([, nom, valeur]) => [nom, valeur]),
  );
  const proprietes = [...bloc.matchAll(/^ {2}(\w+)(\?)?:\s*(.+?);\s*$/gm)].map(([, nom, optionnel, type]) => ({
    nom,
    type: type.trim(),
    obligatoire: !optionnel,
    defaut: defauts[nom],
  }));

  const gabarit = source.slice(source.indexOf('---', 3));
  const slots = [...new Set([...gabarit.matchAll(/<slot(?:\s+name="(\w+)")?/g)].map(([, nom]) => nom ?? 'defaut'))];
  const composeDe = [...source.matchAll(/^import (\w+)(?:, \{[^}]*\})? from '\.{1,2}\/(?:(?:atomes|molecules|organismes)\/)?\w+\.astro';/gm)].map(
    ([, nom]) => nom,
  );
  return { id, niveau: niveau as Niveau, fichier: `src/components/${niveau}/${id}.astro`, figma, proprietes, slots, composeDe };
}

const analyses = Object.entries(sourcesComposants).map(([chemin, source]) => analyser(chemin, source));

export interface GabaritSource {
  id: string;
  fichier: string;
  composants: string[];
}

export const gabaritsSource: GabaritSource[] = Object.entries(sourcesGabarits)
  .map(([chemin, source]) => {
    const id = chemin.match(/(\w+)\.astro$/)![1];
    const composants = [...source.matchAll(/^import (\w+) from '\.\.\/components\/\w+\/\w+\.astro';/gm)].map(([, nom]) => nom);
    return { id, fichier: `src/gabarits/${id}.astro`, composants };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const misesEnPage = Object.entries(sourcesMisesEnPage).map(([chemin, source]) => ({
  id: chemin.match(/(\w+)\.astro$/)![1],
  composants: [...source.matchAll(/^import (\w+) from '\.\.\/components\/\w+\/\w+\.astro';/gm)].map(([, nom]) => nom),
}));

/** Composants par niveau, puis par ordre alphabétique ; `utilisePar` réunit composants, gabarits et mises en page. */
export const composantsSource: ComposantSource[] = analyses
  .map((c) => ({
    ...c,
    utilisePar: [
      ...analyses.filter((a) => a.composeDe.includes(c.id)).map((a) => a.id),
      ...gabaritsSource.filter((g) => g.id !== VITRINE && g.composants.includes(c.id)).map((g) => g.id),
      ...misesEnPage.filter((m) => m.composants.includes(c.id)).map((m) => m.id),
    ],
  }))
  .sort((a, b) => NIVEAUX.indexOf(a.niveau) - NIVEAUX.indexOf(b.niveau) || a.id.localeCompare(b.id));

/** Exemples d'appel, pour les agents et la page. */
export const EXEMPLES: Record<string, string> = {
  Bouton: `<Bouton variante="plein" href="/travaux">Voir les travaux ↓</Bouton>
<Bouton variante="accent" taille="S" type="submit" value="copier">Copier</Bouton>`,
  Encart: `<Encart><p class="text-lead">Chapô du cas.</p></Encart>`,
  Etiquette: `<Etiquette etat={false} etatTexte="non touchée">modèle</Etiquette>
<Etiquette taille="L" balise="h3">surfaces</Etiquette>`,
  Lien: `<Lien texte="text-ui" href="/ecrits">← Tous les écrits</Lien>`,
  Carte: `<Carte taille="L" titre="…" texte="…" meta="Entreprise · domaine" href="/travaux/…"
  visuel={{ src: image, alt: '…' }} etiquettes={etiquettesStrates(strates, ui)} etiquettesLibelle="Strates touchées" />
<Carte {...carteDEcrit(ecrit, locale, ui)} retrait={false} />`,
  EnTete: `<EnTete titre="Travaux" niveau={1} espace="page" />`,
  Figure: `<Figure src="/images/methode/cadrer.svg" legende="Fig. 04 · Un parcours, ses moments et ses frictions" />`,
  GroupeEtiquettes: `<GroupeEtiquettes etiquettes={[{ libelle: 'surfaces', etat: true, etatTexte: 'touchée' }]}
  libelle="Strates touchées" orientation="horizontale" replier="mobile" />`,
  Infobulle: `<div data-infobulle-hote style="position: relative">
  <Bouton aria-describedby="apercu">Copier</Bouton>
  <Infobulle id="apercu" titre="Ce texte sera copié">…</Infobulle>
</div>`,
  Modale: `<Modale id="confirmation" titre="Ce texte sera copié">
  …
  <Fragment slot="actions">
    <Bouton variante="accent" taille="S" type="submit" value="copier">Copier</Bouton>
    <Bouton variante="filet" taille="S" type="submit" value="annuler">Annuler</Bouton>
  </Fragment>
</Modale>`,
  CopieLienIA: `<CopieLienIA {...textes} variante="contour" alignement="fin" emplacement="hero" />`,
  EmailCopiable: `<EmailCopiable locale={locale} />`,
  Navigation: `<Navigation locale={locale} alternate={path('travaux', 'en')} />`,
  PiedDePage: `<PiedDePage locale={locale} avecEmail={false} />`,
  PilierDeMethode: `<PilierDeMethode titre="Cadrer" description="…" pratiques={['Entretiens', 'Tests d’utilisabilité']} />`,
  Planche: `<Planche libelle={ui.planche.libelle} titre={ui.planche.titre} texte={ui.planche.texte} />
<Planche titre={…} texte={…} sombre><EmailCopiable locale={locale} /></Planche>`,
};

/* ---------- Documentation et validation ---------- */

export type DocSysteme = CollectionEntry<'systeme'>['data'];

export async function getSysteme(locale: Locale): Promise<DocSysteme> {
  const entry = await getEntry('systeme', `${locale}/systeme`);
  if (!entry) throw new Error(`Fichier introuvable : content/${locale}/systeme.yaml`);
  const doc = typographier(entry.data, locale);
  validerSysteme(doc, locale);
  return doc;
}

const verifie = new Set<Locale>();

/** Compare la documentation au code ; toute divergence fait échouer le build. */
export function validerSysteme(doc: DocSysteme, locale: Locale) {
  if (verifie.has(locale)) return;
  const fichier = `content/${locale}/systeme.yaml`;
  const erreurs: string[] = [];
  const comparer = (quoi: string, code: string[], documente: string[]) => {
    for (const x of code.filter((c) => !documente.includes(c))) erreurs.push(`${quoi} : « ${x} » n'est pas documenté`);
    for (const x of documente.filter((d) => !code.includes(d))) erreurs.push(`${quoi} : « ${x} » est documenté mais n'existe pas dans le code`);
  };
  const noms = (prefixe: string) => jetonsDe(prefixe).map((j) => j.nom);

  comparer('Couleur', noms('--color-'), Object.keys(doc.jetons.couleurs.usages));
  comparer('Graisse', noms('--font-weight-'), Object.keys(doc.jetons.graisses.usages));
  comparer('Mise en page', noms('--layout-'), Object.keys(doc.jetons.miseEnPage.usages));
  comparer('Mouvement', noms('--motion-'), Object.keys(doc.jetons.mouvement.usages));
  comparer('Style de texte', stylesTexte.map((s) => s.classe), Object.keys(doc.jetons.typographie.roles));
  comparer('Composant', composantsSource.map((c) => c.id), Object.keys(doc.composants));
  comparer('Gabarit', gabaritsSource.map((g) => g.id), Object.keys(doc.gabarits));
  for (const c of composantsSource) {
    const d = doc.composants[c.id];
    if (!d) continue;
    comparer(`${c.id}, propriété`, c.proprietes.map((p) => p.nom), Object.keys(d.props));
    comparer(`${c.id}, slot`, c.slots, Object.keys(d.slots));
    if (!EXEMPLES[c.id]) erreurs.push(`${c.id} : exemple manquant dans lib/systeme.ts`);
  }
  if (erreurs.length) throw new Error(`Design system : la documentation (${fichier}) ne correspond pas au code.\n- ${erreurs.join('\n- ')}`);
  verifie.add(locale);
}
