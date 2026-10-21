/**
 * Données structurées (JSON-LD schema.org) : rattachent le site, LinkedIn et GitHub à une seule
 * entité « Florian Butour ». Seule source de ces informations ; un changement d'employeur se fait ici.
 * Les descriptions reprennent les meta descriptions du site, rien n'est rédigé pour l'occasion.
 */
import { path, type Locale } from '../i18n/routes';
import { getInterface } from '../i18n/ui';
import { getAccueil } from './contenu';
import { SITE_URL } from './site';

export type Noeud = Record<string, unknown>;

const url = (chemin: string) => new URL(chemin, SITE_URL).href;
const ids = { personne: `${SITE_URL}/#person`, site: `${SITE_URL}/#website` } as const;

const PROFIL = {
  nom: 'Florian Butour',
  poste: 'Senior Product Designer',
  employeur: { nom: 'Qlik', url: 'https://www.qlik.com/' },
  ville: 'Nantes',
  pays: 'FR',
  ecole: "L'École de design Nantes Atlantique",
  domaines: ['Product design', 'Design systems', 'Interaction design', 'Data integration', 'AI agents as product users'],
  github: 'https://github.com/flobutbut',
};

/** Graphe commun à toutes les pages : la personne et le site. */
export async function grapheGlobal(locale: Locale): Promise<Noeud[]> {
  const [ui, accueil] = await Promise.all([getInterface(locale), getAccueil(locale)]);
  return [
    {
      '@type': 'Person',
      '@id': ids.personne,
      name: PROFIL.nom,
      url: url('/'),
      jobTitle: PROFIL.poste,
      description: accueil.description,
      worksFor: { '@type': 'Organization', name: PROFIL.employeur.nom, url: PROFIL.employeur.url },
      address: { '@type': 'PostalAddress', addressLocality: PROFIL.ville, addressCountry: PROFIL.pays },
      alumniOf: { '@type': 'CollegeOrUniversity', name: PROFIL.ecole },
      knowsLanguage: ['fr', 'en'],
      knowsAbout: PROFIL.domaines,
      sameAs: [ui.contact.linkedin.url, PROFIL.github],
    },
    {
      '@type': 'WebSite',
      '@id': ids.site,
      url: url('/'),
      name: ui.metadonnees.site,
      inLanguage: ['fr', 'en'],
      publisher: { '@id': ids.personne },
    },
  ];
}

/** Accueil (FR et EN) : page de profil de la personne. */
export function pageDeProfil(locale: Locale): Noeud {
  const adresse = url(path('accueil', locale));
  return {
    '@type': 'ProfilePage',
    '@id': `${adresse}#profilepage`,
    url: adresse,
    inLanguage: locale,
    mainEntity: { '@id': ids.personne },
    isPartOf: { '@id': ids.site },
  };
}

/** Écrit : article signé par la personne. La date n'apparaît que si le contenu en porte une. */
export function article(params: { titre: string; href: string; langue: Locale; date?: Date }): Noeud {
  const adresse = url(params.href);
  return {
    '@type': 'Article',
    '@id': `${adresse}#article`,
    headline: params.titre,
    url: adresse,
    inLanguage: params.langue,
    ...(params.date && { datePublished: params.date.toISOString().slice(0, 10) }),
    author: { '@id': ids.personne },
    isPartOf: { '@id': ids.site },
  };
}

/** Sérialisation sûre dans un <script> : aucun « < » ne peut fermer la balise. */
export function serialiser(graphe: Noeud[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graphe }).replace(/</g, '\\u003c');
}
