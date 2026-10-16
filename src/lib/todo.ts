/**
 * Contenus pas encore fournis : tout texte qui commence par « À compléter ».
 * En développement et en aperçu, ils s'affichent en gris ; en production, ils font échouer le build.
 */
export const TODO_PREFIX = 'À compléter';
const TODO = /^\s*(\*\*)?à\s+compléter/i;

export function isTodo(value: unknown): boolean {
  return typeof value === 'string' && TODO.test(value);
}

/** Le texte contient-il un « À compléter » quelque part (corps Markdown) ? */
export function contientTodo(texte: string): boolean {
  return /à\s+compléter/i.test(texte) || /\]\(a-completer[\s)]/.test(texte);
}

/** Chemins de tous les champs « À compléter » d'un objet : ['decisions[0].auPrixDe', …] */
export function cheminsTodo(valeur: unknown, chemin = ''): string[] {
  if (isTodo(valeur)) return [chemin || '(valeur)'];
  if (Array.isArray(valeur)) return valeur.flatMap((v, i) => cheminsTodo(v, `${chemin}[${i}]`));
  if (valeur && typeof valeur === 'object' && !(valeur instanceof Date)) {
    return Object.entries(valeur).flatMap(([k, v]) => cheminsTodo(v, chemin ? `${chemin}.${k}` : k));
  }
  return [];
}
