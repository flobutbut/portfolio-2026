/**
 * Versions Markdown des cas et des écrits, pour les agents (/travaux/<slug>.md, /en/work/<slug>.md…).
 * Générées au build depuis les mêmes fichiers que les pages : métadonnées, puis texte, sans la navigation.
 * Les figures sont remplacées par leur texte alternatif ; les visuels prévus (« a-venir ») sont omis.
 */
import YAML from 'yaml';
import { versionMarkdown, type Locale } from '../i18n/routes';
import { getInterface } from '../i18n/ui';
import { resoudre, type Element } from './contenu';
import { texteFigure } from './figures';

type Ui = Awaited<ReturnType<typeof getInterface>>;

const deux = (n: number) => String(n).padStart(2, '0');
const deuxPoints = (locale: Locale) => (locale === 'fr' ? ' : ' : ': ');

/** Corps source → Markdown lisible hors du site : directives retirées, figures réduites à leur texte. */
function nettoyer(md: string): string {
  return (
    md
      // Bloc figure en YAML → légende et éléments
      .replace(/^```figure\n([\s\S]*?)^```$/gm, (_, yaml: string) => {
        return texteFigure(YAML.parse(yaml));
      })
      // Paragraphe réduit à une image → son texte alternatif ; visuel prévu → rien
      .replace(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)\s*$/gm, (_, alt: string, url: string) =>
        url === 'a-venir' ? '' : alt,
      )
      // :::lead, :::question et leur fermeture
      .replace(/^:::\w*\s*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function metadonnees(lignes: [string, string | undefined][], locale: Locale): string {
  return lignes
    .filter((l): l is [string, string] => Boolean(l[1]))
    .map(([libelle, valeur]) => `- ${libelle}${deuxPoints(locale).trimEnd()}${valeur.startsWith('\n') ? '' : ' '}${valeur}`)
    .join('\n');
}

function liensLies(liens: { libelle: string; href: string }[], url: (p: string) => string): string | undefined {
  if (!liens.length) return undefined;
  return '\n' + liens.map((l) => `  - [${l.libelle}](${url(versionMarkdown(l.href))})`).join('\n');
}

export async function casEnMarkdown(cas: Element<'cas'>, locale: Locale, url: (p: string) => string) {
  const ui: Ui = await getInterface(locale);
  const t = ui.cas;
  const a = ui.agents;
  const d = cas.data;
  const dp = deuxPoints(locale);

  const ecrits = await resoudre('ecrits', locale, [...d.ecritsLies, ...(d.reglesEcrit ? [d.reglesEcrit] : [])]);
  const lies = [...new Map(ecrits.map((e) => [e.numero, e])).values()].map((e) => ({
    libelle: `${ui.ecrit.surtitre} ${deux(e.numero)} · ${e.data.titre}`,
    href: e.href,
  }));

  const blocs: string[] = [
    `# ${d.titre}`,
    metadonnees(
      [
        ['Type', `${d.nature === 'note' ? a.typeNote : a.typeCas} ${deux(cas.numero)}`],
        [a.entreprise, d.meta],
        [a.periode, d.cartouche.duree],
        [t.role, d.cartouche.role],
        [t.equipe, d.cartouche.equipe],
        [t.livrables, d.cartouche.livrables],
        [a.statut, d.statut === 'publie' ? a.publie : a.brouillon],
        [a.contenusLies, liensLies(lies, url)],
        [a.pageWeb, url(cas.href)],
      ],
      locale,
    ),
    d.chapo,
  ];

  if (d.trenteSecondes) {
    const s = d.trenteSecondes;
    blocs.push(
      `## ${t.trenteSecondes}`,
      [
        [t.probleme, s.probleme],
        [t.decision, s.decision],
        [t.ceQuiReste, s.ceQuiReste],
      ]
        .map(([l, v]) => `**${l}**${dp}${v}`)
        .join('\n\n'),
    );
  }

  const [avant, apres = ''] = cas.body.split(/^::decisions\s*$/m);
  blocs.push(nettoyer(avant));

  if (d.decisions.length) {
    blocs.push(`## ${t.decisions}`, ...(d.titreDecisions ? [d.titreDecisions] : []));
    d.decisions.forEach((dec, i) =>
      blocs.push(
        `### ${deux(i + 1)} · ${dec.titre}`,
        [
          [t.plutotQue, dec.plutotQue],
          [t.parceQue, dec.parceQue],
          [t.auPrixDe, dec.auPrixDe],
        ]
          .map(([l, v]) => `**${l}**${dp}${v}`)
          .join('\n\n'),
      ),
    );
  }
  if (d.regles.length) {
    blocs.push(
      `## ${t.regles}`,
      ...(d.titreRegles ? [d.titreRegles] : []),
      d.regles.map((r, i) => `${i + 1}. ${r}`).join('\n'),
      ...(d.reglesCommentaire ? [d.reglesCommentaire] : []),
    );
    const ecrit = ecrits.find((e) => e.numero === d.reglesEcrit);
    if (ecrit) blocs.push(`${t.renvoiEcrit} ${deux(ecrit.numero)} · [${ecrit.data.titre}](${url(versionMarkdown(ecrit.href))})`);
  }
  if (apres.trim()) blocs.push(nettoyer(apres));

  return blocs.filter(Boolean).join('\n\n') + '\n';
}

export async function ecritEnMarkdown(ecrit: Element<'ecrits'>, locale: Locale, url: (p: string) => string) {
  const ui: Ui = await getInterface(locale);
  const a = ui.agents;
  const d = ecrit.data;

  const cas = await resoudre('cas', locale, d.casCites);
  const ecrits = await resoudre('ecrits', locale, d.ecritsLies);
  const lies = [
    ...cas.map((c) => ({ libelle: `${ui.cas.surtitre} ${deux(c.numero)} · ${c.data.titre}`, href: c.href })),
    ...ecrits.map((e) => ({ libelle: `${ui.ecrit.surtitre} ${deux(e.numero)} · ${e.data.titre}`, href: e.href })),
  ];

  const blocs = [
    `# ${d.titre}`,
    metadonnees(
      [
        ['Type', [`${ui.ecrit.surtitre} ${deux(ecrit.numero)}`, d.genre].filter(Boolean).join(' · ')],
        [a.date, d.date?.toISOString().slice(0, 10)],
        [a.lecture, `${d.tempsLecture} ${ui.ecrit.lecture}`],
        [a.statut, d.statut === 'publie' ? a.publie : a.brouillon],
        [a.contenusLies, liensLies(lies, url)],
        [a.pageWeb, url(ecrit.href)],
      ],
      locale,
    ),
    d.these,
    nettoyer(ecrit.body),
    ...(d.limites ? [`## ${ui.ecrit.limites}`, d.limites.trim()] : []),
  ];

  return blocs.filter(Boolean).join('\n\n') + '\n';
}
