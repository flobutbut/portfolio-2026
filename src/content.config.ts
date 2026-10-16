/**
 * Collections et schémas de contenu.
 * Une erreur de saisie fait échouer le build en nommant le fichier et le champ en cause.
 * Guide : docs/ajouter-du-contenu.md
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug : minuscules, chiffres et tirets uniquement (ex. « mon-cas »)');
const numero = z.number().int().positive();
const strates = z.object({
  surfaces: z.boolean(),
  designSystem: z.boolean(),
  modele: z.boolean(),
});
const statut = z.enum(['brouillon', 'publie']);
/** Identifiant = chemin du fichier (fr/travaux/desoutter), et non le champ slug, partagé entre langues */
const parChemin = ({ entry }: { entry: string }) => entry.replace(/\.(md|ya?ml)$/, '');
/** Image placée dans public/ (ex. /images/desoutter/vue.png) */
const image = z.object({
  src: z.string().startsWith('/', 'src : chemin depuis public/, commençant par « / »'),
  alt: z.string().min(1, 'alt : texte alternatif obligatoire'),
});

/* ---------- Cas : content/fr/travaux/*.md · content/en/work/*.md ---------- */
const cas = defineCollection({
  loader: glob({ pattern: ['fr/travaux/*.md', 'en/work/*.md'], base: './content', generateId: parChemin }),
  schema: z.object({
    numero,
    slug,
    statut,
    /** « cas » (étude de cas) ou « note » (note de conception en cours) */
    nature: z.enum(['cas', 'note']).default('cas'),
    titre: z.string(),
    chapo: z.string(),
    /** Entreprise · domaine */
    meta: z.string(),
    strates,
    /** Titre et description de la ligne dans les listes (à défaut : titre et chapô) */
    entree: z.object({ titre: z.string(), description: z.string() }).optional(),
    visuel: image.optional(),
    /** Chaque ligne est facultative : seules les lignes renseignées s'affichent */
    cartouche: z
      .object({
        role: z.string().optional(),
        duree: z.string().optional(),
        equipe: z.string().optional(),
        livrables: z.string().optional(),
      })
      .default({}),
    /** Encadré bleu facultatif */
    trenteSecondes: z
      .object({
        probleme: z.string(),
        decision: z.string(),
        ceQuiReste: z.string(),
      })
      .optional(),
    titreDecisions: z.string().optional(),
    decisions: z
      .array(
        z.object({
          titre: z.string(),
          plutotQue: z.string(),
          parceQue: z.string(),
          auPrixDe: z.string(),
        }),
      )
      .default([]),
    titreRegles: z.string().optional(),
    regles: z.array(z.string()).default([]),
    reglesCommentaire: z.string().optional(),
    /** Numéro de l'écrit qui argumente ces règles */
    reglesEcrit: numero.optional(),
    /** Numéros des écrits liés */
    ecritsLies: z.array(numero).default([]),
    /** Numéro du cas suivant */
    casSuivant: numero.optional(),
  }),
});

/* ---------- Écrits : content/fr/ecrits/*.md · content/en/writing/*.md ---------- */
const ecrits = defineCollection({
  loader: glob({ pattern: ['fr/ecrits/*.md', 'en/writing/*.md'], base: './content', generateId: parChemin }),
  schema: z.object({
    numero,
    slug,
    statut,
    titre: z.string(),
    these: z.string(),
    /** Genre affiché dans le surtitre (ex. « Prise de position ») */
    genre: z.string().optional(),
    strates,
    /** En minutes */
    tempsLecture: z.number().int().positive(),
    /** Date de publication (AAAA-MM-JJ) */
    date: z.coerce.date().optional(),
    /** Numéros des cas cités */
    casCites: z.array(numero).default([]),
    /** Numéros des écrits liés */
    ecritsLies: z.array(numero).default([]),
    /** Markdown : un ou plusieurs paragraphes */
    limites: z.string().optional(),
  }),
});

/* ---------- Accueil : content/<langue>/accueil.yaml ---------- */
const figure = z.object({
  type: z.enum(['parcours', 'graphe', 'strates']),
  legende: z.string(),
  elements: z.array(z.string()).min(2),
  /** Élément mis en avant (index à partir de 0) */
  actif: z.number().int().nonnegative().optional(),
});

const accueil = defineCollection({
  loader: glob({ pattern: '*/accueil.yaml', base: './content' }),
  schema: z.object({
    titrePage: z.string(),
    description: z.string(),
    hero: z.object({
      surtitre: z.string(),
      accroche: z.string(),
      complement: z.string(),
      nom: z.string(),
      fonction: z.string(),
      details: z.string(),
      voirTravaux: z.string(),
      cv: z.string(),
    }),
    strates: z.object({
      titre: z.string(),
      introduction: z.string(),
      surfaces: z.object({ description: z.string(), exemples: z.string() }),
      designSystem: z.object({ description: z.string(), exemples: z.string() }),
      modele: z.object({ description: z.string(), exemples: z.string() }),
    }),
    travaux: z.object({ titre: z.string() }),
    position: z.object({
      libelle: z.string(),
      titre: z.string(),
      texte: z.string(),
      /** Bloc « Pour les agents » (Figma 94:685) : renvoie vers /agent.md */
      agents: z.object({
        libelle: z.string(),
        texte: z.string(),
        copier: z.string(),
        copie: z.string(),
        lire: z.string(),
        /** Annoncé aux lecteurs d'écran : le bouton « Lire le fichier » ouvre un nouvel onglet */
        nouvelOnglet: z.string(),
      }),
    }),
    methode: z.object({
      titre: z.string(),
      piliers: z
        .array(
          z.object({
            titre: z.string(),
            description: z.string(),
            pratiques: z.array(z.string()),
            figure,
          }),
        )
        .length(3),
    }),
    ecrits: z.object({ titre: z.string() }),
  }),
});

/* ---------- Parcours : content/<langue>/parcours.yaml ---------- */
const parcours = defineCollection({
  loader: glob({ pattern: '*/parcours.yaml', base: './content' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    introduction: z.string(),
    voirTravaux: z.string(),
    cv: z.string(),
    experiences: z.array(
      z.object({
        periode: z.string(),
        lieu: z.string().optional(),
        organisation: z.string(),
        poste: z.string().optional(),
        contexte: z.string().optional(),
        realisations: z.array(z.object({ titre: z.string(), texte: z.string() })).default([]),
        etiquettes: z.array(z.string()).default([]),
      }),
    ),
    formation: z.object({
      titre: z.string(),
      lignes: z.array(z.object({ periode: z.string(), titre: z.string(), texte: z.string() })),
    }),
  }),
});

/* ---------- Textes d'interface : content/<langue>/interface.yaml ---------- */
const interfaceTextes = defineCollection({
  loader: glob({ pattern: '*/interface.yaml', base: './content' }),
  schema: z.object({
    lienEvitement: z.string(),
    navigation: z.object({
      libelle: z.string(),
      accueil: z.string(),
      travaux: z.string(),
      ecrits: z.string(),
      parcours: z.string(),
      contact: z.string(),
      accueilMenu: z.string(),
      ouvrirMenu: z.string(),
      fermerMenu: z.string(),
    }),
    langue: z.object({
      code: z.string(),
      libelle: z.string(),
    }),
    strates: z.object({
      libelle: z.string(),
      surfaces: z.string(),
      designSystem: z.string(),
      modele: z.string(),
      touchee: z.string(),
      nonTouchee: z.string(),
    }),
    cas: z.object({
      surtitre: z.string(),
      role: z.string(),
      duree: z.string(),
      equipe: z.string(),
      livrables: z.string(),
      trenteSecondes: z.string(),
      probleme: z.string(),
      decision: z.string(),
      ceQuiReste: z.string(),
      decisions: z.string(),
      plutotQue: z.string(),
      parceQue: z.string(),
      auPrixDe: z.string(),
      regles: z.string(),
      regle: z.string(),
      renvoiEcrit: z.string(),
      aLireAussi: z.string(),
      casSuivant: z.string(),
      note: z.string(),
      tousLesTravaux: z.string(),
    }),
    ecrit: z.object({
      surtitre: z.string(),
      lecture: z.string(),
      casCite: z.string(),
      limites: z.string(),
      ecritsLies: z.string(),
      tousLesEcrits: z.string(),
    }),
    planche: z.object({
      libelle: z.string(),
      titre: z.array(z.string()).min(1),
      texte: z.array(z.string()).min(1),
    }),
    contact: z.object({
      titre: z.string(),
      email: z.email(),
      copier: z.string(),
      copie: z.string(),
      signature: z.string(),
      linkedin: z.object({ libelle: z.string(), url: z.string() }),
      cv: z.object({ libelle: z.string(), url: z.string() }),
      ecrits: z.string(),
      versionAgent: z.string(),
      localisation: z.string(),
    }),
    agents: z.object({
      typeCas: z.string(),
      typeNote: z.string(),
      entreprise: z.string(),
      periode: z.string(),
      date: z.string(),
      lecture: z.string(),
      statut: z.string(),
      publie: z.string(),
      brouillon: z.string(),
      contenusLies: z.string(),
      pageWeb: z.string(),
    }),
    pageIntrouvable: z.object({
      titre: z.string(),
      texte: z.string(),
      retour: z.string(),
    }),
    metadonnees: z.object({
      site: z.string(),
      description: z.string(),
      travaux: z.string(),
      ecrits: z.string(),
      contact: z.string(),
    }),
  }),
});

export const collections = { cas, ecrits, accueil, parcours, interfaceTextes };
