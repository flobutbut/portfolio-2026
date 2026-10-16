/**
 * Figures de modèle alimentées par des données (bloc ```figure en YAML dans le Markdown).
 * Rendues en HTML sémantique (listes ordonnées) : lisibles sans image, sans JavaScript,
 * par un lecteur d'écran comme par un agent.
 *
 *   type: arborescence  → niveaux[] { nom, description }, bandeau?
 *   type: strates       → strates[] { nom, elements, note, actif? }, base? { elements, note }
 *   type: parcours      → etapes[] { nom, description? }, actif? (index)
 *
 * Toutes acceptent `legende` (Fig. 0X · …).
 */
import type { Locale } from '../i18n/routes';
import { typographier } from './typographie';

const libelles = {
  fr: { niveau: 'Niveau', etape: 'Étape' },
  en: { niveau: 'Level', etape: 'Step' },
} as const;

export function echapper(texte: unknown): string {
  return String(texte ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type Donnees = Record<string, any>;

function legende(d: Donnees) {
  return d.legende ? `<figcaption class="md-legende text-caption">${echapper(d.legende)}</figcaption>` : '';
}

function arborescence(d: Donnees, locale: Locale): string {
  const niveaux: Donnees[] = d.niveaux ?? [];
  const items = niveaux
    .map(
      (n, i) => `<li class="fig-arbo__niveau">
  <span class="fig-arbo__rang text-caption">${libelles[locale].niveau} ${i + 1}${i < niveaux.length - 1 ? '<span aria-hidden="true">  →</span>' : ''}</span>
  <strong class="fig-arbo__nom text-heading-24">${echapper(n.nom)}</strong>
  ${n.description ? `<span class="fig-arbo__description">${echapper(n.description)}</span>` : ''}
</li>`,
    )
    .join('');
  const bandeau = d.bandeau ? `<p class="fig-arbo__bandeau text-ui">${echapper(d.bandeau)}</p>` : '';
  return `<figure class="md-figure fig-arbo"><div class="fig-arbo__corps"><ol class="fig-arbo__niveaux" role="list">${items}</ol>${bandeau}</div>${legende(d)}</figure>`;
}

function strates(d: Donnees): string {
  const items = (d.strates ?? [] as Donnees[])
    .map(
      (s: Donnees) => `<li class="fig-strates__strate${s.actif ? ' fig-strates__strate--actif' : ''}">
  <strong class="fig-strates__nom text-heading-24">${echapper(s.nom)}</strong>
  <span class="fig-strates__contenu"><span class="fig-strates__elements text-ui">${echapper(s.elements)}</span>${
    s.note ? `<span class="fig-strates__note text-caption">${echapper(s.note)}</span>` : ''
  }</span>
</li>`,
    )
    .join('');
  const base = d.base
    ? `<div class="fig-strates__base"><span class="fig-strates__elements text-ui">${echapper(d.base.elements)}</span>${
        d.base.note ? `<span class="fig-strates__note text-caption">${echapper(d.base.note)}</span>` : ''
      }</div>`
    : '';
  return `<figure class="md-figure fig-strates"><div><ol class="fig-strates__liste" role="list">${items}</ol>${base}</div>${legende(d)}</figure>`;
}

function parcours(d: Donnees, locale: Locale): string {
  const etapes: Donnees[] = d.etapes ?? [];
  const items = etapes
    .map(
      (e, i) => `<li class="fig-parcours__etape${d.actif === i ? ' fig-parcours__etape--actif' : ''}">
  <span class="fig-parcours__rang text-caption">${libelles[locale].etape} ${i + 1}</span>
  <strong class="fig-parcours__nom text-heading-24">${echapper(e.nom)}</strong>
  ${e.description ? `<span class="fig-parcours__description">${echapper(e.description)}</span>` : ''}
</li>`,
    )
    .join('');
  return `<figure class="md-figure fig-parcours"><ol class="fig-parcours__etapes" role="list">${items}</ol>${legende(d)}</figure>`;
}

export function renderFigure(donnees: Donnees, locale: Locale, source = ''): string {
  const d = typographier(donnees, locale);
  switch (d?.type) {
    case 'arborescence':
      return arborescence(d, locale);
    case 'strates':
      return strates(d);
    case 'parcours':
      return parcours(d, locale);
    default:
      throw new Error(`${source} : figure de type inconnu « ${d?.type} » (attendu : arborescence, strates ou parcours)`);
  }
}
