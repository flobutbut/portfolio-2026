/**
 * Méthode : sur desktop, l'en-tête de section et la scène (piliers + figure) restent collés,
 * et le défilement fait passer d'un pilier à l'autre. Le pilier actif est complet, les autres
 * se réduisent à leur titre, et la figure correspondante (Fig. 04, 05, 06) apparaît en fondu.
 * Sans JavaScript, sur mobile ou avec prefers-reduced-motion : chaque figure reste sous son pilier.
 */
export function initMethode() {
  const section = document.querySelector<HTMLElement>('[data-methode]');
  const tete = section?.querySelector<HTMLElement>('[data-methode-tete]');
  const piste = section?.querySelector<HTMLElement>('[data-methode-piste]');
  const scene = section?.querySelector<HTMLElement>('[data-methode-scene]');
  if (!section || !tete || !piste || !scene) return;

  const desktop = matchMedia('(min-width: 64rem)');
  const calme = matchMedia('(prefers-reduced-motion: reduce)');
  const piliers = [...section.querySelectorAll<HTMLElement>('[data-pilier]')];
  const figures = [...section.querySelectorAll<HTMLElement>('[data-figure]')];
  let actif = -1;
  let enAttente = false;

  const activer = (index: number) => {
    if (index === actif) return;
    actif = index;
    piliers.forEach((p, i) => p.toggleAttribute('data-actif', i === index));
    figures.forEach((f, i) => {
      f.toggleAttribute('data-actif', i === index);
      f.setAttribute('aria-hidden', String(i !== index));
    });
  };

  // Avancement dans la course de défilement (0 → 1), découpé en autant de tranches que de piliers
  const suivre = () => {
    enAttente = false;
    const course = piste.offsetHeight - scene.offsetHeight;
    const haut = parseFloat(getComputedStyle(scene).top) || 0;
    const avance = course > 0 ? (haut - piste.getBoundingClientRect().top) / course : 0;
    activer(Math.min(piliers.length - 1, Math.max(0, Math.floor(avance * piliers.length))));
  };
  const auDefilement = () => {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(suivre);
  };
  // La scène se colle sous l'en-tête de section, dont la hauteur suit la taille du titre
  const mesurer = () => section.style.setProperty('--methode-tete', `${tete.offsetHeight}px`);

  const appliquer = () => {
    removeEventListener('scroll', auDefilement);
    removeEventListener('resize', mesurer);
    const collee = desktop.matches && !calme.matches;
    section.classList.toggle('methode--collee', collee);
    actif = -1;
    if (!collee) {
      piliers.forEach((p) => p.removeAttribute('data-actif'));
      figures.forEach((f) => {
        f.removeAttribute('data-actif');
        f.removeAttribute('aria-hidden');
      });
      return;
    }
    mesurer();
    suivre();
    addEventListener('scroll', auDefilement, { passive: true });
    addEventListener('resize', mesurer);
  };

  appliquer();
  desktop.addEventListener('change', appliquer);
  calme.addEventListener('change', appliquer);
}
