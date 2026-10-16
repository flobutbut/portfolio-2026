/**
 * Rendu du corps Markdown des cas et des écrits.
 *
 * Conventions (voir docs/ajouter-du-contenu.md) :
 * - Cas : chaque `## Titre` ouvre une section (libellé numéroté) ; le premier `### Titre` en est le grand titre.
 *   La ligne `::decisions` place les blocs « Décisions » et « Règles » du frontmatter.
 * - Écrit : `## Titre` = intertitre ; le premier paragraphe est un chapô (Lead/22).
 * - `> citation` → citation à filet bleu.
 * - `:::lead … :::` → paragraphe Lead/22 ; `:::question … :::` → question finale en bleu.
 * - ```figure (YAML) → figure de modèle (arborescence, strates, parcours).
 * - `![alt](/images/x.png "Légende")` → figure avec légende ; `![alt](a-completer "Légende")` → emplacement vide (bloque la production).
 * - `![Visuel prévu](a-venir "Légende")` → emplacement en aperçu seulement ; omis en production, sans bloquer.
 * - Un paragraphe qui commence par « À compléter » s'affiche en gris.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Root, Paragraph, PhrasingContent, RootContent } from 'mdast';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import sharp from 'sharp';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import YAML from 'yaml';
import type { Locale } from '../i18n/routes';
import { echapper, renderFigure } from './figures';
import { isTodo } from './todo';
import { modeApercu } from './mode';
import { typographieFr } from './typographie';

interface Options {
  locale: Locale;
  mode: 'cas' | 'ecrit';
  fichier: string;
}

function texteDe(noeuds: PhrasingContent[]): string {
  return noeuds.map((n) => ('value' in n ? n.value : 'children' in n ? texteDe(n.children as PhrasingContent[]) : '')).join('');
}

function classe(noeud: { data?: any }, ...noms: string[]) {
  noeud.data ??= {};
  noeud.data.hProperties ??= {};
  const actuelles = noeud.data.hProperties.className ?? [];
  noeud.data.hProperties.className = [...actuelles, ...noms];
}

async function dimensions(src: string): Promise<{ width?: number; height?: number }> {
  const fichier = join(process.cwd(), 'public', src);
  if (!existsSync(fichier)) return {};
  const { width, height } = await sharp(fichier).metadata();
  return { width, height };
}

function remarkStrates({ locale, mode, fichier }: Options) {
  return async (arbre: Root) => {
    const fr = locale === 'fr';
    const taches: Promise<void>[] = [];

    // Typographie française sur le texte courant
    if (fr) visit(arbre, 'text', (n) => void (n.value = typographieFr(n.value)));

    visit(arbre, (noeud, index, parent) => {
      if (!parent || index === undefined) return;
      const enfants = parent.children as RootContent[];

      // :::lead et :::question
      if (noeud.type === 'containerDirective' && (noeud.name === 'lead' || noeud.name === 'question')) {
        const nom = noeud.name === 'lead' ? 'md-lead' : 'md-question';
        for (const c of noeud.children) if (c.type === 'paragraph') classe(c, nom);
        enfants.splice(index, 1, ...(noeud.children as RootContent[]));
        return index;
      }

      // Directive de texte non prévue (« mot:autre ») : on rend le texte tel quel
      if (noeud.type === 'textDirective') {
        enfants[index] = { type: 'text', value: `:${noeud.name}${texteDe(noeud.children)}` };
        return;
      }

      // Bloc figure en YAML
      if (noeud.type === 'code' && noeud.lang === 'figure') {
        let donnees: unknown;
        try {
          donnees = YAML.parse(noeud.value);
        } catch (e) {
          throw new Error(`${fichier} : bloc figure illisible (${(e as Error).message})`);
        }
        enfants[index] = { type: 'html', value: renderFigure(donnees as Record<string, unknown>, locale, fichier) };
        return;
      }

      if (noeud.type === 'blockquote') classe(noeud, 'md-citation');

      if (noeud.type === 'heading') {
        if (mode === 'cas' && noeud.depth === 3) classe(noeud, 'md-titre', 'text-heading-40');
        if (mode === 'ecrit' && noeud.depth === 2) classe(noeud, 'md-intertitre', 'text-heading-24');
      }

      if (noeud.type === 'paragraph') {
        const p = noeud as Paragraph;
        // Paragraphe réduit à une image → figure légendée
        if (p.children.length === 1 && p.children[0].type === 'image') {
          const img = p.children[0];
          const alt = fr ? typographieFr(img.alt ?? '') : (img.alt ?? '');
          const titre = img.title ? (fr ? typographieFr(img.title) : img.title) : '';
          const legende = titre ? `<figcaption class="md-legende text-caption">${echapper(titre)}</figcaption>` : '';
          const html = { type: 'html' as const, value: '' };
          enfants[index] = html;
          if (img.url === 'a-venir') {
            // Visuel prévu : visible en aperçu, absent du site publié
            html.value = modeApercu
              ? `<figure class="md-figure"><div class="md-emplacement" role="img" aria-label="${echapper(alt)}"><span class="text-caption">${echapper(alt)}</span></div>${legende}</figure>`
              : '';
          } else if (img.url === 'a-completer') {
            html.value = `<figure class="md-figure"><div class="md-emplacement todo" role="img" aria-label="${echapper(alt)}"><span class="text-caption">${echapper(alt)}</span></div>${legende}</figure>`;
          } else {
            if (!alt) throw new Error(`${fichier} : l’image ${img.url} n’a pas de texte alternatif`);
            taches.push(
              dimensions(img.url).then(({ width, height }) => {
                const taille = width && height ? ` width="${width}" height="${height}"` : '';
                html.value = `<figure class="md-figure"><img src="${echapper(img.url)}" alt="${echapper(alt)}"${taille} loading="lazy" decoding="async">${legende}</figure>`;
              }),
            );
          }
          return;
        }
        if (isTodo(texteDe(p.children))) classe(p, 'todo');
      }
    });

    await Promise.all(taches);
  };
}

async function rendre(md: string, options: Options): Promise<string> {
  const fichier = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkStrates, options)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(fichier);
}

export interface Section {
  libelle: string;
  html: string;
  /** La section a son propre grand titre (### …) ; sinon le libellé sert de grand titre */
  avecTitre: boolean;
}

function decouper(md: string): { intro: string; sections: { libelle: string; md: string }[] } {
  const morceaux = md.split(/^##\s+(.+)$/m);
  const intro = morceaux[0];
  const sections = [];
  for (let i = 1; i < morceaux.length; i += 2) sections.push({ libelle: morceaux[i].trim(), md: morceaux[i + 1] ?? '' });
  return { intro, sections };
}

/** Corps d'un cas : texte d'introduction, puis sections avant et après la ligne `::decisions`. */
export async function rendreCas(body: string, locale: Locale, fichier: string) {
  const [avant, apres = ''] = body.split(/^::decisions\s*$/m);
  const options: Options = { locale, mode: 'cas', fichier };
  const fr = locale === 'fr';
  const rendreSections = async (md: string): Promise<Section[]> =>
    Promise.all(
      decouper(md).sections.map(async (s) => ({
        libelle: fr ? typographieFr(s.libelle) : s.libelle,
        html: await rendre(s.md, options),
        avecTitre: /^\s*###\s/.test(s.md),
      })),
    );
  const intro = decouper(avant).intro.trim();
  return {
    intro: intro ? await rendre(intro, options) : '',
    avant: await rendreSections(avant),
    apres: await rendreSections(apres),
    aDecisions: /^::decisions\s*$/m.test(body),
  };
}

/** Corps d'un écrit : un seul flux, premier paragraphe en chapô. */
export async function rendreEcrit(body: string, locale: Locale, fichier: string) {
  const html = await rendre(body, { locale, mode: 'ecrit', fichier });
  return html.replace(/^<p>/, '<p class="md-lead">');
}

/** Petit Markdown (champ de frontmatter comme `limites`). */
export async function rendreTexte(md: string, locale: Locale, fichier: string) {
  return rendre(md, { locale, mode: 'ecrit', fichier });
}
