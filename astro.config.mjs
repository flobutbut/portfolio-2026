// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://florianbutour.com',
  trailingSlash: 'never',
  build: {
    // Le CSS du site est court : l'intégrer évite une requête bloquante.
    inlineStylesheets: 'always',
  },
  // Les adresses traduites (/travaux ↔ /en/work) sont gérées par src/i18n/routes.ts.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
