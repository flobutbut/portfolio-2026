/** Adresse de l'image Open Graph d'une page : /travaux/desoutter → /og/travaux/desoutter.png */
export function ogPath(pathname: string): string {
  const propre = pathname.replace(/\/$/, '') || '/index';
  return `/og${propre === '/' ? '/index' : propre}.png`;
}
