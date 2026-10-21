/**
 * Points de terminaison des versions Markdown : un fichier mince par langue et par genre
 * (pages/travaux/[slug].md.ts, pages/en/work/[slug].md.ts…) appelle `pointsMarkdown`.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import type { Locale } from '../i18n/routes';
import { lister, type Element } from './contenu';
import { casEnMarkdown, ecritEnMarkdown } from './versionsMarkdown';
import { SITE_URL } from './site';

export function pointsMarkdown(genre: 'cas' | 'ecrits', locale: Locale) {
  const getStaticPaths = (async () =>
    (await lister(genre, locale)).map((element) => ({ params: { slug: element.slug }, props: { element } }))) satisfies GetStaticPaths;

  const GET: APIRoute = async ({ props, site }) => {
    const url = (p: string) => new URL(p, site ?? SITE_URL).href;
    const texte =
      genre === 'cas'
        ? await casEnMarkdown(props.element as Element<'cas'>, locale, url)
        : await ecritEnMarkdown(props.element as Element<'ecrits'>, locale, url);
    return new Response(texte, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
  };

  return { getStaticPaths, GET };
}
