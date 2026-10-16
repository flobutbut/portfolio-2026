/**
 * Inventaire des pages du site, par paires FR/EN.
 * Alimente le sitemap, les images Open Graph, llms.txt et content.json.
 */
import { path, routes, type Locale, type RouteKey } from '../i18n/routes';
import { contenusVisibles, lister } from './contenu';

export interface PagePaire {
  fr: string;
  en: string;
}

export async function toutesLesPages(): Promise<PagePaire[]> {
  const visibles = await contenusVisibles('fr');
  const fixes = (Object.keys(routes) as RouteKey[])
    // Listes vides : hors sitemap tant qu'aucun contenu n'est publié
    .filter((k) => (k !== 'travaux' || visibles.cas) && (k !== 'ecrits' || visibles.ecrits))
    .map((k) => ({ fr: path(k, 'fr'), en: path(k, 'en') }));
  const paires: PagePaire[] = [];
  for (const genre of ['cas', 'ecrits'] as const) {
    const fr = await lister(genre, 'fr');
    for (const e of fr) paires.push({ fr: e.href, en: e.alternate });
  }
  return [...fixes, ...paires];
}

export function localeDe(chemin: string): Locale {
  return chemin === '/en' || chemin.startsWith('/en/') ? 'en' : 'fr';
}
