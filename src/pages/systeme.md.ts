import type { APIRoute } from 'astro';
import { systemeEnMarkdown } from '../lib/systemeAgents';
import { SITE_URL } from '../lib/site';

/** Design system pour les agents, en Markdown : la page /systeme sans la mise en forme. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE_URL);
  const texte = await systemeEnMarkdown('fr', (p) => new URL(p, base).href);
  return new Response(texte, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
