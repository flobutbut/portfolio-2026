/**
 * Typographie française appliquée au rendu des contenus français.
 * - espace fine insécable (U+202F) avant ; ? ! et à l'intérieur des guillemets « »
 * - espace insécable (U+00A0) avant :
 * Seules les espaces déjà saisies sont converties : « 12:30 » ou « https:// » restent intacts.
 */
import type { Locale } from '../i18n/routes';

const FINE = ' ';
const INSECABLE = ' ';

export function typographieFr(texte: string): string {
  return texte
    .replace(/[   ]+([;?!])/g, `${FINE}$1`)
    .replace(/[   ]+:/g, `${INSECABLE}:`)
    .replace(/«[   ]*/g, `«${FINE}`)
    .replace(/[   ]*»/g, `${FINE}»`);
}

/** Applique la typographie à toutes les chaînes d'un objet de données (frontmatter, YAML). */
export function typographier<T>(valeur: T, locale: Locale): T {
  if (locale !== 'fr') return valeur;
  if (typeof valeur === 'string') return typographieFr(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => typographier(v, locale)) as T;
  if (valeur && typeof valeur === 'object' && !(valeur instanceof Date) && Object.getPrototypeOf(valeur) === Object.prototype) {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, typographier(v, locale)])) as T;
  }
  return valeur;
}
