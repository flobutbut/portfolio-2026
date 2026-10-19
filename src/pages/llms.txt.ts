import type { APIRoute } from 'astro';
import { getAccueil, lireAgent, lister } from '../lib/contenu';
import { getInterface } from '../i18n/ui';
import { fichiersAgents, path, versionMarkdown } from '../i18n/routes';

/**
 * llms.txt (https://llmstxt.org, v2), généré au build.
 * Renvoie d'abord vers /agent.md, puis vers la version Markdown de chaque cas et de chaque écrit.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://florianbutour.com');
  const url = (p: string) => new URL(p, base).href;
  const md = (p: string) => url(versionMarkdown(p));
  const accueil = await getAccueil('fr');
  const ui = await getInterface('fr');
  const cas = await lister('cas', 'fr');
  const ecrits = await lister('ecrits', 'fr');
  const titreAgent = (await lireAgent()).match(/^# (.+)$/m)?.[1] ?? fichiersAgents.agent;
  const casEn = await lister('cas', 'en');
  const ecritsEn = await lister('ecrits', 'en');

  const lignes = [
    `# ${ui.metadonnees.site}`,
    '',
    `> ${ui.metadonnees.description}`,
    '',
    `${accueil.strates.introduction}`,
    '',
    'Chaque cas et chaque écrit existe en HTML et en Markdown : la version Markdown est à la même adresse, suivie de « .md ».',
    '',
    '## Version pour les agents',
    '',
    `- [${titreAgent}](${url(fichiersAgents.agent)}): point d’entrée complet, en français`,
    '',
    '## Études de cas',
    '',
    ...cas.map((c) => `- [${c.data.titre}](${md(c.href)}): ${c.data.chapo}`),
    '',
    '## Écrits',
    '',
    ...ecrits.map((e) => `- [${e.data.titre}](${md(e.href)}): ${e.data.these}`),
    '',
    '## Pages',
    '',
    `- [Parcours](${url(path('parcours', 'fr'))})`,
    `- [Contact](${url(path('contact', 'fr'))}): ${ui.contact.email}`,
    `- [${ui.systeme.titre}](${url(`${path('systeme', 'fr')}.md`)}): ${ui.metadonnees.systeme}`,
    `- [${ui.systeme.titre} (JSON)](${url(`${path('systeme', 'fr')}.json`)}): tokens au format W3C Design Tokens, composants avec propriétés et règles d’usage`,
    `- [${ui.contact.cv.libelle}](${url(ui.contact.cv.url)})`,
    '',
    '## Optional',
    '',
    ...casEn.map((c) => `- [${c.data.titre}](${md(c.href)}): case study, English`),
    ...ecritsEn.map((e) => `- [${e.data.titre}](${md(e.href)}): writing, English`),
    `- [Export structuré](${url('/content.json')}): cas et écrits, deux langues, en JSON`,
    '',
  ];
  // Notes de liens : « [nom](url): note », sans espace avant les deux-points (format de la spécification)
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
