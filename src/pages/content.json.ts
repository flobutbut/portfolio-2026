import type { APIRoute } from 'astro';
import { lister } from '../lib/contenu';

/**
 * Export structuré des cas et écrits, pour les agents.
 * Généré au build depuis les mêmes fichiers que les pages ; seuls les contenus publiés en production.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://florianbutour.com');
  const url = (p: string) => new URL(p, base).href;
  const langues = ['fr', 'en'] as const;
  const sortie: Record<string, unknown> = { site: base.href, genere: new Date().toISOString(), langues: {} };
  for (const locale of langues) {
    const cas = await lister('cas', locale);
    const ecrits = await lister('ecrits', locale);
    (sortie.langues as Record<string, unknown>)[locale] = {
      cas: cas.map((c) => ({ url: url(c.href), langue: c.langue, ...c.data, corps: c.body.trim() })),
      ecrits: ecrits.map((e) => ({ url: url(e.href), langue: e.langue, ...e.data, corps: e.body.trim() })),
    };
  }
  return new Response(JSON.stringify(sortie, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
