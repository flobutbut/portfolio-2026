import type { APIRoute } from 'astro';
import { lireAgent, valider } from '../lib/contenu';

/** docs/agent.md, publié tel quel. En production, un « À compléter » y fait échouer le build (lib/contenu.ts). */
export const GET: APIRoute = async () => {
  await valider();
  return new Response(await lireAgent(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
