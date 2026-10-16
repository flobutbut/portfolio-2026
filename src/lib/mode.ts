/**
 * Mode de publication.
 * - Production (`npm run build`, déploiement Vercel de production) : seuls les contenus publiés,
 *   et le moindre « À compléter » fait échouer le build.
 * - Aperçu (`npm run dev`, `npm run build:apercu`, déploiements Vercel de prévisualisation) :
 *   brouillons visibles, « À compléter » affichés en gris.
 */
export const modeApercu: boolean =
  import.meta.env.DEV || process.env.APERCU === '1' || process.env.VERCEL_ENV === 'preview';
