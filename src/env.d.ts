// PostHog n'est chargé qu'en production (components/PostHog.astro) : ailleurs, window.posthog est absent.
interface Window {
  posthog?: {
    capture(event: string, properties?: Record<string, unknown>, options?: { transport?: 'sendBeacon'; send_instantly?: boolean }): void;
  };
  /** Posé par le script de langue de BaseLayout quand la page part vers l'autre langue */
  __redirectionLangue?: boolean;
}
