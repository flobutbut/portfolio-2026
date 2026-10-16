/**
 * Méthode : sur desktop, la figure reste collée à droite pendant que les piliers défilent.
 * Le pilier entré dans la zone de lecture devient actif, les autres s'estompent,
 * et la figure correspondante (Fig. 04, 05, 06) apparaît en fondu.
 * Sans JavaScript, sur mobile ou avec prefers-reduced-motion : chaque figure reste sous son pilier.
 */
export function initMethode() {
  const section = document.querySelector<HTMLElement>('[data-methode]');
  if (!section || !('IntersectionObserver' in window)) return;

  const desktop = matchMedia('(min-width: 64rem)');
  const calme = matchMedia('(prefers-reduced-motion: reduce)');
  const piliers = [...section.querySelectorAll<HTMLElement>('[data-pilier]')];
  const figures = [...section.querySelectorAll<HTMLElement>('[data-figure]')];
  let observateur: IntersectionObserver | undefined;

  const activer = (index: number) => {
    piliers.forEach((p, i) => p.toggleAttribute('data-actif', i === index));
    figures.forEach((f, i) => {
      f.toggleAttribute('data-actif', i === index);
      f.setAttribute('aria-hidden', String(i !== index));
    });
  };

  const appliquer = () => {
    observateur?.disconnect();
    const collee = desktop.matches && !calme.matches;
    section.classList.toggle('methode--collee', collee);
    if (!collee) {
      piliers.forEach((p) => p.removeAttribute('data-actif'));
      figures.forEach((f) => {
        f.removeAttribute('data-actif');
        f.removeAttribute('aria-hidden');
      });
      return;
    }
    activer(0);
    observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) activer(piliers.indexOf(e.target as HTMLElement));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    piliers.forEach((p) => observateur!.observe(p));
  };

  appliquer();
  desktop.addEventListener('change', appliquer);
  calme.addEventListener('change', appliquer);
}
