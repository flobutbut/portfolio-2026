/**
 * Versions du design system pour les agents, générées au build depuis la même source que la page :
 * - JSON (/systeme.json, /en/system.json) : jetons au format du W3C Design Tokens Community Group,
 *   composants avec niveau, fichier, propriétés, slots, règles et exemple ;
 * - Markdown (/systeme.md, /en/system.md) : la page, sans la mise en forme.
 */
import { path, type Locale } from '../i18n/routes';
import { resoudre as resoudreContenus } from './contenu';
import {
  EXEMPLES,
  NIVEAUX,
  composantsSource,
  gabaritsSource,
  getSysteme,
  jetonsDe,
  resoudre,
  stylesTexte,
  type DocSysteme,
} from './systeme';

/** Écrits qui portent le propos du design system : 03 (patterns et règles d'usage) et 04 (l'IA, deuxième usager). */
export const ECRITS_SYSTEME = [3, 4];

const px = (valeur: string) => {
  const rem = valeur.match(/^([\d.]+)rem$/);
  return rem ? { value: Number(rem[1]) * 16, unit: 'px' } : valeur;
};

/** Couleurs en arbre DTCG : --color-background-brand → color.background.brand */
function arbreCouleurs(doc: DocSysteme) {
  const arbre: Record<string, Record<string, unknown>> = {};
  for (const { nom, valeur } of jetonsDe('--color-')) {
    const [groupe, ...reste] = nom.replace('--color-', '').split('-');
    (arbre[groupe] ??= {})[reste.join('-')] = {
      $type: 'color',
      $value: valeur,
      $description: doc.jetons.couleurs.usages[nom],
      $extensions: { css: nom },
    };
  }
  return arbre;
}

function typographie(doc: DocSysteme) {
  return Object.fromEntries(
    stylesTexte.map(({ classe, declarations: d }) => [
      classe.replace('text-', ''),
      {
        $type: 'typography',
        $value: {
          fontFamily: resoudre(d['font-family'] ?? 'var(--font-body)'),
          fontWeight: Number(resoudre(d['font-weight'] ?? '')) || undefined,
          fontSize: resoudre(d['font-size'] ?? ''),
          lineHeight: resoudre(d['line-height'] ?? ''),
          letterSpacing: d['letter-spacing'] ? resoudre(d['letter-spacing']) : undefined,
          textTransform: d['text-transform'],
        },
        $description: doc.jetons.typographie.roles[classe],
        $extensions: { css: `.${classe}` },
      },
    ]),
  );
}

const groupeSimple = (prefixe: string, type: string | undefined, usages: Record<string, string> | undefined, valeur = (v: string) => v as unknown) =>
  Object.fromEntries(
    jetonsDe(prefixe).map(({ nom, valeur: v }) => [
      nom.replace(prefixe, ''),
      { ...(type && { $type: type }), $value: valeur(v), ...(usages?.[nom] && { $description: usages[nom] }), $extensions: { css: nom } },
    ]),
  );

function duree(v: string) {
  const ms = v.match(/^(\d+)ms$/);
  if (ms) return { value: Number(ms[1]), unit: 'ms' };
  const courbe = v.match(/cubic-bezier\(([^)]+)\)/);
  return courbe ? courbe[1].split(',').map(Number) : v;
}

export async function systemeEnJson(locale: Locale, url: (p: string) => string) {
  const doc = await getSysteme(locale);
  const ecrits = await resoudreContenus('ecrits', locale, ECRITS_SYSTEME);
  return {
    nom: doc.surtitre,
    langue: locale,
    page: url(path('systeme', locale)),
    genere: new Date().toISOString(),
    introduction: doc.introduction,
    ecritsLies: ecrits.map((e) => ({ titre: e.data.titre, these: e.data.these, url: url(e.href) })),
    niveaux: Object.fromEntries(Object.entries(doc.niveaux).map(([cle, n]) => [cle, n])),
    jetons: {
      color: arbreCouleurs(doc),
      fontWeight: groupeSimple('--font-weight-', 'fontWeight', doc.jetons.graisses.usages, Number),
      typography: typographie(doc),
      spacing: groupeSimple('--space-', 'dimension', undefined, px),
      layout: groupeSimple('--layout-', undefined, doc.jetons.miseEnPage.usages),
      motion: Object.fromEntries(
        jetonsDe('--motion-').map(({ nom, valeur }) => [
          nom.replace('--motion-', ''),
          {
            $type: nom.endsWith('ease') ? 'cubicBezier' : 'duration',
            $value: duree(valeur),
            $description: doc.jetons.mouvement.usages[nom],
            $extensions: { css: nom },
          },
        ]),
      ),
    },
    regles: {
      couleurs: doc.jetons.couleurs.regles,
      typographie: doc.jetons.typographie.regles,
      graisses: doc.jetons.graisses.regles,
      espacements: doc.jetons.espacements.regles,
      miseEnPage: doc.jetons.miseEnPage.regles,
      mouvement: doc.jetons.mouvement.regles,
    },
    composants: composantsSource.map((c) => {
      const d = doc.composants[c.id];
      return {
        id: c.id,
        nom: d.nom,
        niveau: c.niveau,
        fichier: c.fichier,
        figma: c.figma,
        role: d.role,
        variantes: d.variantes,
        proprietes: c.proprietes.map((p) => ({ ...p, description: d.props[p.nom] })),
        slots: c.slots.map((s) => ({ nom: s, description: d.slots[s] })),
        faire: d.faire,
        eviter: d.eviter,
        accessibilite: d.accessibilite,
        composeDe: c.composeDe,
        utilisePar: c.utilisePar,
        exemple: EXEMPLES[c.id],
      };
    }),
    gabarits: gabaritsSource.map((g) => ({ id: g.id, fichier: g.fichier, description: doc.gabarits[g.id], composants: g.composants })),
  };
}

const tableau = (entetes: string[], lignes: string[][]) =>
  [`| ${entetes.join(' | ')} |`, `| ${entetes.map(() => '---').join(' | ')} |`, ...lignes.map((l) => `| ${l.map((c) => c.replace(/\|/g, '\\|')).join(' | ')} |`)].join(
    '\n',
  );
const puces = (l: string[]) => l.map((x) => `- ${x}`).join('\n');

export async function systemeEnMarkdown(locale: Locale, url: (p: string) => string) {
  const doc = await getSysteme(locale);
  const L = doc.libelles;
  const ecrits = await resoudreContenus('ecrits', locale, ECRITS_SYSTEME);
  const json = url(`${path('systeme', locale)}.json`);
  const sections: string[] = [
    `# ${doc.titre} · ${doc.surtitre}`,
    doc.introduction.join('\n\n'),
    `## ${doc.agents.titre}`,
    doc.agents.texte.join('\n\n'),
    `- [${doc.agents.json}](${json})`,
    ...(ecrits.length ? [`${doc.agents.ecritsLies} :`, puces(ecrits.map((e) => `[${e.data.titre}](${url(e.href)}) : ${e.data.these}`))] : []),
    `## 1. ${doc.niveaux.jetons.titre}`,
    doc.niveaux.jetons.description,
  ];
  const groupe = (titre: string, description: string, regles: string[], lignes: string[][], entetes: string[]) =>
    sections.push(`### ${titre}`, description, tableau(entetes, lignes), `${L.regles} :`, puces(regles));

  const j = doc.jetons;
  groupe(j.couleurs.titre, j.couleurs.description, j.couleurs.regles, jetonsDe('--color-').map((t) => [`\`${t.nom}\``, t.valeur, j.couleurs.usages[t.nom]]), [L.jeton, L.valeur, L.usage]);
  groupe(
    j.typographie.titre,
    j.typographie.description,
    j.typographie.regles,
    stylesTexte.map((s) => [`\`.${s.classe}\``, `${resoudre(s.declarations['font-size'] ?? '')} / ${resoudre(s.declarations['line-height'] ?? '')}`, j.typographie.roles[s.classe]]),
    [L.classe, L.taille, L.role],
  );
  groupe(j.graisses.titre, j.graisses.description, j.graisses.regles, jetonsDe('--font-weight-').map((t) => [`\`${t.nom}\``, t.valeur, j.graisses.usages[t.nom]]), [L.jeton, L.valeur, L.usage]);
  groupe(j.espacements.titre, j.espacements.description, j.espacements.regles, jetonsDe('--space-').map((t) => [`\`${t.nom}\``, t.valeur]), [L.jeton, L.valeur]);
  groupe(j.miseEnPage.titre, j.miseEnPage.description, j.miseEnPage.regles, jetonsDe('--layout-').map((t) => [`\`${t.nom}\``, t.valeur, j.miseEnPage.usages[t.nom]]), [L.jeton, L.valeur, L.usage]);
  groupe(j.mouvement.titre, j.mouvement.description, j.mouvement.regles, jetonsDe('--motion-').map((t) => [`\`${t.nom}\``, t.valeur, j.mouvement.usages[t.nom]]), [L.jeton, L.valeur, L.usage]);

  NIVEAUX.forEach((niveau, i) => {
    sections.push(`## ${i + 2}. ${doc.niveaux[niveau].titre}`, doc.niveaux[niveau].description);
    for (const c of composantsSource.filter((x) => x.niveau === niveau)) {
      const d = doc.composants[c.id];
      sections.push(
        `### ${d.nom} (\`${c.id}\`)`,
        `${L.fichier} : \`${c.fichier}\`${c.figma.length ? ` · ${L.figma} : ${c.figma.join(', ')}` : ''}`,
        d.role,
        `${L.variantes} :`,
        puces(d.variantes),
      );
      if (c.proprietes.length)
        sections.push(
          tableau(
            [L.propriete, L.type, L.defaut, L.description],
            c.proprietes.map((p) => [`\`${p.nom}\``, `\`${p.type}\``, p.defaut ? `\`${p.defaut}\`` : p.obligatoire ? L.obligatoire : '', d.props[p.nom]]),
          ),
        );
      if (c.slots.length) sections.push(`${L.slots} :`, puces(c.slots.map((s) => `${s === 'defaut' ? L.slotDefaut : s} : ${d.slots[s]}`)));
      sections.push(`${L.faire} :`, puces(d.faire), `${L.eviter} :`, puces(d.eviter), `${L.accessibilite} :`, puces(d.accessibilite));
      if (c.composeDe.length) sections.push(`${L.composeDe} : ${c.composeDe.join(', ')}`);
      if (c.utilisePar.length) sections.push(`${L.utilisePar} : ${c.utilisePar.join(', ')}`);
      sections.push('```astro\n' + EXEMPLES[c.id] + '\n```');
    }
  });

  sections.push(
    `## 5. ${doc.niveaux.gabarits.titre}`,
    doc.niveaux.gabarits.description,
    tableau([L.page, L.description, L.composeDe], gabaritsSource.map((g) => [`\`${g.fichier}\``, doc.gabarits[g.id], g.composants.join(', ')])),
  );
  return sections.join('\n\n') + '\n';
}
