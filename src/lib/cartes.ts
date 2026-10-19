/**
 * Passage des contenus aux composants génériques : un cas devient une Carte L, un écrit une Carte M,
 * et leurs strates touchées un Groupe d'étiquettes. Un seul endroit pour ces correspondances.
 */
import type { Locale } from '../i18n/routes';
import type { getInterface } from '../i18n/ui';
import type { Element } from './contenu';
import { STRATES, type Strates } from './strates';

type Ui = Awaited<ReturnType<typeof getInterface>>;

/** Les trois strates, chacune On ou Off, avec leur état lu par les technologies d'assistance. */
export function etiquettesStrates(strates: Strates, ui: Ui) {
  return STRATES.map((cle) => ({
    libelle: ui.strates[cle],
    etat: strates[cle],
    etatTexte: strates[cle] ? ui.strates.touchee : ui.strates.nonTouchee,
  }));
}

/**
 * Propriétés de la Carte L d'un cas. `visuel` remplace celui du cas (par exemple un emplacement en aperçu) ;
 * `null` donne la carte sans visuel.
 */
export function carteDeCas(c: Element<'cas'>, locale: Locale, ui: Ui, visuel: { src?: string; alt: string } | null | undefined = c.data.visuel) {
  return {
    taille: 'L' as const,
    lang: c.langue !== locale ? c.langue : undefined,
    titre: c.data.entree?.titre ?? c.data.titre,
    texte: c.data.entree?.description ?? c.data.chapo,
    meta: c.data.meta,
    href: c.href,
    visuel: visuel ?? undefined,
    etiquettes: etiquettesStrates(c.data.strates, ui),
    etiquettesLibelle: ui.strates.libelle,
  };
}

/** Propriétés de la Carte M d'un écrit. */
export function carteDEcrit(e: Element<'ecrits'>, locale: Locale, ui: Ui) {
  return {
    taille: 'M' as const,
    lang: e.langue !== locale ? e.langue : undefined,
    titre: e.data.titre,
    texte: e.data.these,
    href: e.href,
    etiquettes: etiquettesStrates(e.data.strates, ui),
    etiquettesLibelle: ui.strates.libelle,
  };
}
