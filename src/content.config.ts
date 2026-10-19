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
/** Figure de la méthode : illustration placée dans public/, sur fond gris, et sa légende */
const figure = z.object({
  src: z.string().startsWith('/', 'src : chemin depuis public/, commençant par « / »'),
  legende: z.string(),
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
        /** Message si le presse-papiers refuse la copie : la modale montre alors le texte à copier à la main */
        echec: z.string(),
        apercu: z.string(),
        confirmer: z.string(),
        annuler: z.string(),
        /** Prompt copié ; doit contenir {lien}, remplacé par l'adresse de la version agent */
        prompt: z.string().refine((t) => t.includes('{lien}'), 'Le prompt doit contenir {lien}'),
        lire: z.string(),
        /** Annoncé aux lecteurs d'écran : le bouton « Lire la version agent » ouvre un nouvel onglet */
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
      designSystem: z.string(),
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
    /** Page Design system (/systeme) : le reste de ses textes est dans systeme.yaml */
    systeme: z.object({ titre: z.string() }),
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
      systeme: z.string(),
    }),
  }),
});

/* ---------- Documentation du design system : content/<langue>/systeme.yaml ---------- */
const liste = z.array(z.string());
const titreDescription = z.object({ titre: z.string(), description: z.string() });
const groupeJetons = z.object({ titre: z.string(), description: z.string(), regles: liste });
const LIBELLES_SYSTEME = [
  'sommaire', 'jeton', 'valeur', 'usage', 'style', 'classe', 'taille', 'role', 'propriete', 'type', 'defaut',
  'description', 'obligatoire', 'slots', 'slotDefaut', 'variantes', 'faire', 'eviter', 'accessibilite', 'exemple',
  'composeDe', 'utilisePar', 'fichier', 'figma', 'regles', 'apercu', 'page', 'exempleTexte', 'indisponible',
  'slotExemple', 'enPlace',
] as const;
const systeme = defineCollection({
  loader: glob({ pattern: '*/systeme.yaml', base: './content' }),
  schema: z.object({
    titre: z.string(),
    surtitre: z.string(),
    introduction: liste,
    agents: z.object({ titre: z.string(), texte: liste, markdown: z.string(), json: z.string(), ecritsLies: z.string() }),
    niveaux: z.object({
      jetons: titreDescription,
      atomes: titreDescription,
      molecules: titreDescription,
      organismes: titreDescription,
      gabarits: titreDescription,
    }),
    libelles: z.object(Object.fromEntries(LIBELLES_SYSTEME.map((k) => [k, z.string()])) as Record<(typeof LIBELLES_SYSTEME)[number], z.ZodString>),
    jetons: z.object({
      couleurs: groupeJetons.extend({ usages: z.record(z.string(), z.string()) }),
      typographie: groupeJetons.extend({ roles: z.record(z.string(), z.string()) }),
      graisses: groupeJetons.extend({ usages: z.record(z.string(), z.string()) }),
      espacements: groupeJetons,
      miseEnPage: groupeJetons.extend({ usages: z.record(z.string(), z.string()) }),
      mouvement: groupeJetons.extend({ usages: z.record(z.string(), z.string()) }),
    }),
    composants: z.record(
      z.string(),
      z.object({
        nom: z.string(),
        role: z.string(),
        variantes: liste,
        faire: liste,
        eviter: liste,
        accessibilite: liste,
        props: z.record(z.string(), z.string()),
        slots: z.record(z.string(), z.string()).default({}),
      }),
    ),
    gabarits: z.record(z.string(), z.string()),
  }),
});

export const collections = { cas, ecrits, accueil, parcours, interfaceTextes, systeme };
