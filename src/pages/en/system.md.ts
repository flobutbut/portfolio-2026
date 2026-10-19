import type { APIRoute } from 'astro';
import { systemeEnMarkdown } from '../../lib/systemeAgents';

/** Design system pour les agents, en Markdown : la page /systeme sans la mise en forme. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://florianbutour.com');
  const texte = await systemeEnMarkdown('en', (p) => new URL(p, base).href);
  return new Response(texte, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
