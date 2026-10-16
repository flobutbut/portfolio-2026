import type { APIRoute } from 'astro';
import { getAccueil, lister } from '../lib/contenu';
import { getInterface } from '../i18n/ui';
import { path } from '../i18n/routes';

/** llms.txt (https://llmstxt.org) : résumé du site et liens vers les contenus, généré au build. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://florianbutour.com');
  const url = (p: string) => new URL(p, base).href;
  const accueil = await getAccueil('fr');
  const ui = await getInterface('fr');
  const cas = await lister('cas', 'fr');
  const ecrits = await lister('ecrits', 'fr');
  const casEn = await lister('cas', 'en');
  const ecritsEn = await lister('ecrits', 'en');

  const lignes = [
    `# ${ui.metadonnees.site}`,
    '',
    `> ${ui.metadonnees.description}`,
    '',
    `${accueil.strates.introduction}`,
    '',
    'Légende commune : chaque cas et chaque écrit déclare les strates qu’il touche — surfaces (les endroits où l’on rencontre le produit), design system (les règles qui traduisent le modèle en surfaces), modèle (objets, relations, dépendances, états, droits).',
    '',
    `Export structuré complet : ${url('/content.json')}`,
    '',
    '## Travaux',
    ...cas.map((c) => `- [${c.data.titre}](${url(c.href)}) : ${c.data.chapo}`),
    '',
    '## Écrits',
    ...ecrits.map((e) => `- [${e.data.titre}](${url(e.href)}) : ${e.data.these}`),
    '',
    '## Pages',
    `- [Parcours](${url(path('parcours', 'fr'))})`,
    `- [Contact](${url(path('contact', 'fr'))}) : ${ui.contact.email}`,
    '',
    '## English',
    `- [Home](${url(path('accueil', 'en'))})`,
    ...casEn.map((c) => `- [${c.data.titre}](${url(c.href)})`),
    ...ecritsEn.map((e) => `- [${e.data.titre}](${url(e.href)})`),
    `- [Background](${url(path('parcours', 'en'))})`,
    `- [Contact](${url(path('contact', 'en'))})`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
