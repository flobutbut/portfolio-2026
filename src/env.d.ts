// PostHog n'est chargé qu'en production (components/PostHog.astro) : ailleurs, window.posthog est absent.
interface Window {
  posthog?: { capture(event: string, properties?: Record<string, unknown>): void };
}
