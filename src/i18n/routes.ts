/**
 * Table unique des adresses FR ↔ EN.
 * Elle alimente la navigation, le sélecteur de langue, les balises hreflang et le sitemap.
 * Français à la racine, anglais sous /en.
 */

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const routes = {
  accueil: { fr: '/', en: '/en' },
  travaux: { fr: '/travaux', en: '/en/work' },
  ecrits: { fr: '/ecrits', en: '/en/writing' },
  parcours: { fr: '/parcours', en: '/en/background' },
  contact: { fr: '/contact', en: '/en/contact' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Adresse d'une page, avec un slug pour les pages de cas et d'écrits. */
export function path(key: RouteKey, locale: Locale, slug?: string): string {
  const base = routes[key][locale];
  return slug ? `${base}/${slug}` : base;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Fichiers destinés aux agents : hors table FR ↔ EN, une seule adresse pour les deux langues. */
export const fichiersAgents = { agent: '/agent.md', llms: '/llms.txt' } as const;

/** Version Markdown d'une page de cas ou d'écrit : même adresse, suivie de `.md`. */
export function versionMarkdown(href: string): string {
  return `${href}.md`;
}
