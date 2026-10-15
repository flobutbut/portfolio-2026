import { getEntry } from 'astro:content';
import type { Locale } from './routes';

/** Textes d'interface validés de la langue demandée. */
export async function getInterface(locale: Locale) {
  const entry = await getEntry('interfaceTextes', `${locale}/interface`);
  if (!entry) throw new Error(`Textes d'interface introuvables : content/${locale}/interface.yaml`);
  return entry.data;
}
