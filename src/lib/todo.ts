/** Marqueur des contenus pas encore fournis. */
export const TODO_PREFIX = 'À compléter';

export function isTodo(value: string | undefined): boolean {
  return typeof value === 'string' && value.trimStart().startsWith(TODO_PREFIX);
}
