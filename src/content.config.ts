import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Textes d'interface, un fichier YAML par langue : content/<langue>/interface.yaml */
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
    contact: z.object({
      titre: z.string(),
      email: z.email(),
      copier: z.string(),
      copie: z.string(),
      signature: z.string(),
      linkedin: z.object({ libelle: z.string(), url: z.string() }),
      cv: z.object({ libelle: z.string(), url: z.string() }),
      ecrits: z.string(),
      localisation: z.string(),
    }),
    pageIntrouvable: z.object({
      titre: z.string(),
      texte: z.string(),
      retour: z.string(),
    }),
  }),
});

export const collections = { interfaceTextes };
