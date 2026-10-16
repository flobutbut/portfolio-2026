import type { APIRoute } from 'astro';
import { lireAgent, valider } from './contenu';

/**
 * docs/agent.md, publié tel quel à /agent.md et /agent.txt.
 * En production, un « À compléter » y fait échouer le build (lib/contenu.ts).
 * Servi en text/plain, comme sur Vercel (vercel.json) : certains outils web d'assistants refusent text/markdown.
 */
export const GET: APIRoute = async () => {
  await valider();
  return new Response(await lireAgent(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
