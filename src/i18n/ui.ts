import type { Locale } from './routes';
import { getTextesInterface } from '../lib/contenu';

/** Textes d'interface validés de la langue demandée, typographie française appliquée. */
export function getInterface(locale: Locale) {
  return getTextesInterface(locale);
}
