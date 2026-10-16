import type { APIRoute } from 'astro';
import { toutesLesPages } from '../lib/pages';

/** Sitemap avec les équivalents de langue (hreflang) */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://florianbutour.com');
  const url = (p: string) => new URL(p, base).href;
  const pages = await toutesLesPages();
  const entrees = pages.flatMap((paire) =>
    [paire.fr, paire.en].map(
      (loc) => `  <url>
    <loc>${url(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${url(paire.fr)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url(paire.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(paire.fr)}"/>
  </url>`,
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrees.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
