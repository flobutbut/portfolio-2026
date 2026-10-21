import type { APIRoute } from 'astro';
import { systemeEnJson } from '../../lib/systemeAgents';
import { SITE_URL } from '../../lib/site';

/** Design system pour les agents : jetons (format W3C DTCG) et composants, en JSON. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE_URL);
  const donnees = await systemeEnJson('en', (p) => new URL(p, base).href);
  return new Response(JSON.stringify(donnees, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
