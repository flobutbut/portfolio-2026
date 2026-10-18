/**
 * Figures de modèle alimentées par des données (bloc ```figure en YAML dans le Markdown).
 * Rendues en HTML sémantique (listes ordonnées) : lisibles sans image, sans JavaScript,
 * par un lecteur d'écran comme par un agent.
 *
 *   type: arborescence  → niveaux[] { nom, description }, bandeau?
 *   type: strates       → strates[] { nom, elements, note, actif? }, base? { elements, note }
 *   type: parcours      → etapes[] { nom, description? }, actif? (index)
 *   type: schema        → blocs[] composés des éléments de la page Figma « Schéma » (voir schema() plus bas),
 *                         fond? (true par défaut : aplat gris)
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

/* ---------- Schémas (Figma « Section 2 » : Schéma/Objet, Liaison, Puce, Bloc, Couche, Bibliothèque) ----------
 * Chaque bloc est un objet à une clé :
 *   chaine:   [ { objet, description?, emphase? } | { liaison, sens?: droite|gauche } | { groupe: blocs[], intitule? } ],
 *             alignee? (objets de largeur fixe : les chaînes successives s'alignent en colonnes)
 *   objets:   [ { objet, description?, emphase? } ]   (objets empilés)
 *   puces:    { intitule?, pointille?, elements: [ { texte, note?, ton?: gris|plein|contour } ] }
 *   colonnes: [ { intitule?, note?, blocs[] } ]
 *   page:     { surtitre?, titre, blocs: [ { bloc, ton?: clair|gris|bleu, lignes?, suite? } ] }
 *   couches:  [ { nom, detail?, emphase? } ]
 *   bibliotheques: [ { surtitre, nom } ]
 *   surfaces: [ nom ]            (surfaces juxtaposées, chacune avec ses propres composants, décoratifs)
 *   usages:   { lignes: [ { usage, surfaces: puces[] } ], legende?: puces[], note? }
 * Les mises en page passent à la ligne d'elles-mêmes (comme l'auto-layout « wrap » de Figma) ;
 * sous 40rem, les chaînes s'empilent et leurs flèches pointent vers le bas.
 */
const fleche = { droite: '→', gauche: '←' } as const;

function puce(p: Donnees): string {
  const ton = ['gris', 'plein', 'contour'].includes(p.ton) ? p.ton : 'plein';
  const note = p.note ? ` <span class="sch-puce__note">${echapper(p.note)}</span>` : '';
  return `<li class="sch-puce sch-puce--${ton}"><span class="sch-puce__texte">${echapper(p.texte)}</span>${note}</li>`;
}

function objet(o: Donnees): string {
  const description = o.description ? `<span class="sch-objet__description text-caption">${echapper(o.description)}</span>` : '';
  return `<div class="sch-objet${o.emphase ? ' sch-objet--emphase' : ''}"><strong class="sch-objet__nom">${echapper(o.objet)}</strong>${description}</div>`;
}

function liaison(l: Donnees): string {
  const sens = l.sens === 'gauche' ? 'gauche' : 'droite';
  return `<div class="sch-liaison sch-liaison--${sens}"><span class="sch-liaison__libelle text-caption"><span class="visually-hidden">${fleche[sens]} </span>${echapper(l.liaison)}</span><span class="sch-liaison__trait" aria-hidden="true"></span></div>`;
}

function blocSchema(b: Donnees): string {
  if (b.chaine) {
    const items = (b.chaine as Donnees[])
      .map((e) => (e.liaison ? liaison(e) : e.groupe ? `<div class="sch-groupe">${intitule(e.intitule)}${blocsSchema(e.groupe)}</div>` : objet(e)))
      .join('');
    return `<div class="sch-chaine${b.alignee ? ' sch-chaine--alignee' : ''}">${items}</div>`;
  }
  if (b.objets) return `<div class="sch-objets">${(b.objets as Donnees[]).map(objet).join('')}</div>`;
  if (b.puces) {
    const p = b.puces as Donnees;
    return `<div class="sch-puces${p.pointille ? ' sch-puces--pointille' : ''}">${intitule(p.intitule)}<ul class="sch-puces__liste" role="list">${(p.elements ?? []).map(puce).join('')}</ul></div>`;
  }
  if (b.colonnes) {
    const cols = (b.colonnes as Donnees[])
      .map((c) => `<div class="sch-colonne">${intitule(c.intitule)}${c.note ? `<p class="sch-note text-caption">${echapper(c.note)}</p>` : ''}${blocsSchema(c.blocs)}</div>`)
      .join('');
    return `<div class="sch-colonnes">${cols}</div>`;
  }
  if (b.page) {
    const p = b.page as Donnees;
    const blocs = (p.blocs ?? [] as Donnees[])
      .map((x: Donnees) => {
        const ton = ['clair', 'gris', 'bleu'].includes(x.ton) ? x.ton : 'gris';
        const lignes = x.lignes ? `<span class="sch-page__lignes" aria-hidden="true">${'<span></span>'.repeat(Number(x.lignes))}</span>` : '';
        const suite = x.suite ? `<span class="sch-page__suite text-caption">${echapper(x.suite)}</span>` : '';
        return `<li class="sch-bloc sch-bloc--${ton}"><span class="sch-bloc__texte">${echapper(x.bloc)}</span>${lignes}${suite}</li>`;
      })
      .join('');
    return `<div class="sch-page">${p.surtitre ? `<span class="sch-page__surtitre text-label">${echapper(p.surtitre)}</span>` : ''}<strong class="sch-page__titre text-body-strong">${echapper(p.titre)}</strong><ul class="sch-page__blocs" role="list">${blocs}</ul></div>`;
  }
  if (b.couches) {
    const items = (b.couches as Donnees[])
      .map((c) => `<li class="sch-couche${c.emphase ? ' sch-couche--emphase' : ''}"><strong class="sch-couche__nom">${echapper(c.nom)}</strong>${c.detail ? ` <span class="sch-couche__detail">${echapper(c.detail)}</span>` : ''}</li>`)
      .join('');
    return `<ul class="sch-couches" role="list">${items}</ul>`;
  }
  if (b.bibliotheques) {
    const items = (b.bibliotheques as Donnees[])
      .map((c) => `<li class="sch-bibliotheque"><span class="sch-bibliotheque__surtitre text-caption">${echapper(c.surtitre)}</span> <strong class="sch-bibliotheque__nom">${echapper(c.nom)}</strong></li>`)
      .join('');
    return `<ul class="sch-bibliotheques" role="list">${items}</ul>`;
  }
  if (b.surfaces) {
    // Chaque surface aligne ses propres composants : des formes qui ne se ressemblent pas (décoratives)
    const formes = [
      [0, 95, true], [11, 70, false], [4, 88, false], [19, 56, true],
    ] as const;
    const items = (b.surfaces as string[])
      .map((nom, i) => {
        const dessins = formes
          .map((_, k) => formes[(k + i) % formes.length])
          .map(([decalage, largeur, arrondi]) => `<span class="sch-surface__forme${arrondi ? ' sch-surface__forme--arrondie' : ''}" style="margin-left: ${decalage}%; width: ${largeur}%"></span>`)
          .join('');
        return `<li class="sch-surface"><span class="sch-surface__nom">${echapper(nom)}</span><span class="sch-surface__formes" aria-hidden="true">${dessins}</span></li>`;
      })
      .join('');
    return `<ul class="sch-surfaces" role="list">${items}</ul>`;
  }
  if (b.usages) {
    const u = b.usages as Donnees;
    const lignes = (u.lignes ?? [] as Donnees[])
      .map((l: Donnees) => `<li class="sch-usage"><strong class="sch-usage__nom">${echapper(l.usage)}</strong><ul class="sch-puces__liste" role="list">${(l.surfaces ?? []).map(puce).join('')}</ul></li>`)
      .join('');
    const legende = u.legende
      ? `<div class="sch-usages__legende"><ul class="sch-puces__liste" role="list">${(u.legende as Donnees[]).map(puce).join('')}</ul>${u.note ? `<p class="sch-note text-caption">${echapper(u.note)}</p>` : ''}</div>`
      : '';
    return `<div class="sch-usages"><ul class="sch-usages__lignes" role="list">${lignes}</ul>${legende}</div>`;
  }
  throw new Error(`bloc de schéma inconnu : ${Object.keys(b).join(', ')}`);
}

function intitule(texte?: string): string {
  return texte ? `<p class="sch-intitule text-label">${echapper(texte)}</p>` : '';
}

function blocsSchema(blocs: Donnees[] = []): string {
  return blocs.map(blocSchema).join('');
}

function schema(d: Donnees): string {
  return `<figure class="md-figure sch"><div class="sch__corps${d.fond === false ? '' : ' sch__corps--fond'}">${blocsSchema(d.blocs)}</div>${legende(d)}</figure>`;
}

/** Texte d'une figure pour les versions Markdown (agents) : légende, puis les éléments lisibles. */
export function texteFigure(d: Donnees): string {
  const textes: string[] = [];
  const parcourir = (v: unknown, cle = ''): void => {
    if (Array.isArray(v)) return v.forEach((x) => parcourir(x, cle));
    if (v && typeof v === 'object') return Object.entries(v).forEach(([k, x]) => parcourir(x, k));
    if (typeof v === 'string' && !['type', 'legende', 'ton', 'sens'].includes(cle)) textes.push(cle === 'liaison' ? `→ ${v}` : v);
  };
  parcourir({ ...d, legende: undefined });
  return [d.legende, textes.join(' · ')].filter(Boolean).join(' : ');
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
    case 'schema':
      try {
        return schema(d);
      } catch (e) {
        throw new Error(`${source} : ${(e as Error).message}`);
      }
    default:
      throw new Error(`${source} : figure de type inconnu « ${d?.type} » (attendu : arborescence, strates, parcours ou schema)`);
  }
}
