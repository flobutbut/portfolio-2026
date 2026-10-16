/**
 * Images Open Graph (1 200 × 630), une par page, générées au build :
 * satori (texte → SVG, avec les vraies polices) puis sharp (SVG → PNG).
 * Composition reprise du hero : surface blanche avec le titre, colonne bleue avec les trois strates.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { path, type Locale } from '../../i18n/routes';
import { getInterface } from '../../i18n/ui';
import { getAccueil, getParcours, lister } from '../../lib/contenu';
import { STRATES, type Strates } from '../../lib/strates';

const require = createRequire(import.meta.url);
const police = (paquet: string, fichier: string) => readFileSync(require.resolve(`${paquet}/files/${fichier}`));
const polices = [
  { name: 'Archivo', data: police('@fontsource/archivo', 'archivo-latin-900-normal.woff'), weight: 900 as const, style: 'normal' as const },
  { name: 'Schibsted', data: police('@fontsource/schibsted-grotesk', 'schibsted-grotesk-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Schibsted', data: police('@fontsource/schibsted-grotesk', 'schibsted-grotesk-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
];

interface Carte {
  surtitre: string;
  titre: string;
  locale: Locale;
  strates?: Strates;
}

async function cartes(): Promise<Map<string, Carte>> {
  const m = new Map<string, Carte>();
  for (const locale of ['fr', 'en'] as const) {
    const ui = await getInterface(locale);
    const a = await getAccueil(locale);
    const p = await getParcours(locale);
    const site = ui.metadonnees.site;
    m.set(path('accueil', locale), { surtitre: `${site} · ${a.hero.fonction.replace(/\.$/, '')}`, titre: a.hero.accroche, locale });
    m.set(path('travaux', locale), { surtitre: site, titre: ui.navigation.travaux, locale });
    m.set(path('ecrits', locale), { surtitre: site, titre: ui.navigation.ecrits, locale });
    m.set(path('parcours', locale), { surtitre: site, titre: p.titre, locale });
    for (const c of await lister('cas', locale))
      m.set(c.href, { surtitre: `${site} · ${ui.cas.surtitre} ${String(c.numero).padStart(2, '0')}`, titre: c.data.titre, locale, strates: c.data.strates });
    for (const e of await lister('ecrits', locale))
      m.set(e.href, { surtitre: `${site} · ${ui.ecrit.surtitre} ${String(e.numero).padStart(2, '0')}`, titre: e.data.titre, locale, strates: e.data.strates });
  }
  return m;
}

export const getStaticPaths = (async () => {
  const toutes = await cartes();
  return [...toutes.entries()].map(([chemin, carte]) => ({
    params: { chemin: chemin === '/' ? 'index' : chemin.slice(1) },
    props: { carte },
  }));
}) satisfies GetStaticPaths;

type Noeud = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Noeud => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { carte } = props as { carte: Carte };
  const ui = await getInterface(carte.locale);
  const tailleTitre = carte.titre.length > 60 ? 60 : carte.titre.length > 32 ? 72 : 88;

  const arbre = h('div', { display: 'flex', width: '100%', height: '100%', background: '#ffffff' }, [
    h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 860, padding: '64px 56px' }, [
      h('div', { fontFamily: 'Schibsted', fontSize: 22, color: '#737373', textTransform: 'uppercase' }, carte.surtitre),
      h(
        'div',
        { fontFamily: 'Archivo', fontWeight: 900, fontSize: tailleTitre, lineHeight: 0.94, letterSpacing: '-0.06em', color: '#0d0d0d' },
        carte.titre,
      ),
      h('div', { fontFamily: 'Schibsted', fontWeight: 500, fontSize: 24, color: '#0d0d0d' }, 'florianbutour.com'),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 340, padding: '56px 40px', background: '#1f2be0' }, [
      h('div', { fontFamily: 'Archivo', fontWeight: 900, fontSize: 56, letterSpacing: '-0.035em', color: '#ffffff' }, 'FB.'),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 8 },
        STRATES.map((cle) => {
          const on = carte.strates ? carte.strates[cle] : true;
          return h(
            'div',
            {
              display: 'flex',
              padding: '10px 14px',
              fontFamily: 'Schibsted',
              fontSize: 24,
              color: on ? '#1f2be0' : 'rgba(255,255,255,0.8)',
              background: on ? '#ffffff' : 'transparent',
              border: on ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.5)',
            },
            ui.strates[cle],
          );
        }),
      ),
    ]),
  ]);

  const svg = await satori(arbre as never, { width: 1200, height: 630, fonts: polices });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

