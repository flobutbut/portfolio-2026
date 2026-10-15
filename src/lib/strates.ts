/** Les trois strates, dans l'ordre de la légende commune du site. */
export const STRATES = ['surfaces', 'designSystem', 'modele'] as const;
export type StrateKey = (typeof STRATES)[number];
export type Strates = Record<StrateKey, boolean>;
