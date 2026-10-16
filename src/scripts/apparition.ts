/**
 * Apparition discrète des sections à leur entrée dans l'écran, une seule fois.
 * Le masquage initial n'existe que si ce script tourne (classe .js sur <html>)
 * et sans prefers-reduced-motion : sinon tout est visible d'emblée.
 */
export function initApparition() {
  const sections = document.querySelectorAll<HTMLElement>('[data-apparition]');
  if (!sections.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach((s) => s.classList.add('apparu'));
    return;
  }
  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('apparu');
        observateur.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  sections.forEach((s) => {
    // Déjà visible au chargement (retour arrière, ancre) : pas d'animation
    if (s.getBoundingClientRect().top < innerHeight) s.classList.add('apparu');
    else observateur.observe(s);
  });
}
