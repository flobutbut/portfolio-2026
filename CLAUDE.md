# Portfolio Florian Butour

Site statique bilingue (FR à la racine, EN sous `/en`) construit avec **Astro 7**. Le site prouve qu'on peut rendre lisibles des systèmes techniques complexes. Performance, accessibilité et propreté du code font partie du message : les ingénieurs ouvriront les outils de développement.

Principe directeur : **retirer avant d'ajouter**. Pas de dépendance, de script ou de style sans besoin démontré. Le mouvement n'existe que s'il révèle une structure.

## Commandes

```bash
npm run dev       # serveur de développement, http://localhost:4321
npm run dev:clean # idem après avoir vidé le cache de contenu (à faire après un changement de schéma)
npm run build         # production : types, puis build ; refuse tout « À compléter » publié
npm run build:apercu  # aperçu : brouillons visibles, « À compléter » en gris
npm run preview       # sert dist/ localement
npm run check     # vérification des types seule
```

Node 22.22 ou plus.

## Structure

```
content/<langue>/          Contenus éditoriaux, un dossier par langue (guide : docs/ajouter-du-contenu.md)
  interface.yaml           Textes d'interface (navigation, contact, gabarits, métadonnées)
  accueil.yaml, parcours.yaml
  systeme.yaml             Documentation du design system (sens des jetons et composants)
  travaux|work/*.md        Cas (frontmatter typé + corps Markdown)
  ecrits|writing/*.md      Écrits
content/_modeles/          Fichiers modèles à copier (hors collections)
src/
  content.config.ts        Collections et schémas Zod : une erreur de saisie casse le build
  i18n/routes.ts           Table unique des adresses FR ↔ EN (navigation, hreflang, sitemap)
  i18n/ui.ts               getInterface(locale) : textes d'interface validés
  lib/contenu.ts           Lecture, filtrage (statut), appariement FR/EN par numero, repli, validation de production
  lib/markdown.ts          Rendu du corps : sections, ::decisions, :::lead, :::question, figures, images
  lib/figures.ts           Figures de modèle en HTML (arborescence, strates, parcours)
  lib/typographie.ts       Espaces insécables françaises
  lib/mode.ts              Mode aperçu (dev, build:apercu, Vercel preview) ou production
  lib/todo.ts              Repérage des valeurs « À compléter »
  lib/pages.ts, og.ts      Inventaire des pages, chemins des images Open Graph
  scripts/                 Amélioration progressive : méthode collée, apparition des sections
  pages/og/, sitemap.xml.ts, robots.txt.ts, llms.txt.ts, content.json.ts   Générés au build
  styles/tokens.css        Jetons (couleurs, échelle typographique fluide, mise en page)
  styles/global.css        Réinitialisation, classes de style de texte, utilitaires
  styles/fonts.css         @font-face des polices auto-hébergées
  layouts/BaseLayout.astro <html lang>, <head>, lien d'évitement, navigation, contact
  components/atomes/       Atomes : Bouton, Encart, Etiquette, Lien (n'utilisent que des jetons)
  components/molecules/    Molécules : Carte, EnTete, Figure, GroupeEtiquettes, Infobulle, Modale
  components/organismes/   Organismes : CopieLienIA, EmailCopiable, Navigation, PiedDePage, PilierDeMethode, Planche
  gabarits/                Gabarits de page partagés entre FR et EN, reçoivent `locale`
  layouts/                 BaseLayout (<head>, navigation, pied de page) et PostHog
  lib/systeme.ts           Design system : jetons, styles et composants lus dans le code, validation doc ↔ code
  lib/systemeAgents.ts     Exports pour les agents : /systeme.json (W3C DTCG) et /systeme.md
  lib/cartes.ts            Cas → Carte L, écrit → Carte M, strates → Groupe d'étiquettes
  pages/                   Fichiers minces : importent une vue et passent la langue
public/fonts/              Archivo et Schibsted Grotesk (woff2 variables, licences OFL)
docs/                      Notes de décision et guides
```

## Sources de vérité

- **Figma** `AqUur6HhWyKnXAJwEwx1Ol` (MCP Figma officiel disponible) : accueil `1:14`, travaux `9:1314`, écrits `9:1861`, parcours `9:1964`, contact `54:671`, cas `27:316`, écrit `28:342`, page « Composants » `9:773`.
- Quand une maquette contredit le brief ou une règle ci-dessous : **signaler, ne pas trancher seul**.
- Arbitrages déjà rendus : intitulé « Senior Product Designer » ; `text/muted` = #737373 (et non #8A8A8A) ; Caption en 13 px ; marge unique de 56 px ; sélecteur de langue « EN / FR » après Contact ; favicon « FB. » sur carré bleu ; strates du brief (surfaces, design system, modèle) partout ; strate Off en `text/supporting` #5C5C59 ; bandeaux de strate de 28 px ; interligne UI 20 px.

## Conventions

### Jetons et styles
- Couleurs : uniquement les rôles `--color-<groupe>-<nom>` de `tokens.css`. Jamais de valeur en dur dans un composant.
- Un seul accent : le bleu `--color-background-brand`, en aplat. Sur le bleu, jamais `--color-text-muted`.
- Texte : classes `.text-display`, `.text-heading-40`, `.text-heading-24`, `.text-lead`, `.text-body`, `.text-body-strong`, `.text-ui`, `.text-caption`, `.text-label` (mêmes noms que les styles Figma).
- Les capitales passent par `.text-label`, jamais tapées dans le contenu.
- Graisses : uniquement `--font-weight-regular|medium|extrabold|black` (400, 500, 800, 900). Chaque classe de texte fixe sa graisse ; `strong` est en Medium partout (règle globale).
- Espacements (marges, retraits, gouttières, positions) : uniquement l'échelle `--space-<px>` de `tokens.css` (2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128). Grandes mesures de mise en page : `--layout-*`.
- Échelle fluide entre 375 et 1 440 px ; Body (17), UI (15), Caption (13/20) et Label (12) ne descendent jamais sous leur taille.
- **Toutes les dimensions en pixels sont des nombres pairs** (tailles, interlignes, espacements, bordures).
- Une seule marge latérale : `--layout-gutter`, 56 px sur desktop, 20 px sur mobile.
- Points de rupture : mobile `< 40rem`, tablette `40rem–64rem`, desktop au-delà.
- `prefers-reduced-motion` : `--motion-duration` passe à 0 ; tout s'affiche dans son état final.

### Composants
- Atomic design : jetons, atomes, molécules, organismes, gabarits. Un dossier par niveau ; un composant n'importe que des niveaux inférieurs ou égaux.
- Composants **génériques à variantes**, jamais spécialisés par usage : `Carte` (taille L ou M, apparence ligne ou cadre, avec ou sans visuel) sert aux cas, aux écrits et aux strates ; `Bouton` (variante plein, contour, accent, filet ; taille M ou S) sert partout, y compris dans les modales. Le passage contenu → props est dans `lib/cartes.ts`.
- Renommages par rapport à Figma, à reporter : Strate → Etiquette, StratesTouchees → GroupeEtiquettes, EnTeteDeSection → EnTete, EntreeDeProjet et EntreeDEcrit → Carte, FigureMethode → Figure, PlancheContact → Planche, Contact → PiedDePage.
- **Documentation obligatoire** : tout composant, toute propriété, tout slot, tout jeton de couleur, graisse, mise en page ou mouvement doit être décrit dans `content/fr/systeme.yaml` et `content/en/systeme.yaml`, et chaque composant a un exemple dans `EXEMPLES` (`lib/systeme.ts`). Sinon le build échoue. Ajouter aussi son aperçu dans `gabarits/Systeme.astro`.
- Page Design system publique : `/systeme` et `/en/system` (gabarit `gabarits/Systeme.astro`, lien dans le pied de page), sommaire vertical par niveau. Versions agents : `/systeme.md`, `/systeme.json` (et `/en/system.*`), référencées dans `llms.txt`.
- Styles limités au composant (`<style>` Astro) ; classes en BEM léger (`bloc__element--variante`).
- Scripts : `<script>` natifs dans le composant, en amélioration progressive. La page doit fonctionner sans JavaScript.
- Aucun framework client tant qu'aucun besoin interactif ne l'exige (l'intégration Vue n'est pas installée).
- Navigation mobile (`< 40rem`) : menu burger plein écran construit sur l'API Popover native (fonctionne sans JavaScript).

### Bilingue
- Toute adresse passe par `path(key, locale, slug?)` de `src/i18n/routes.ts`. Ne jamais écrire une adresse en dur.
- Chaque page passe `alternate` (adresse de l'équivalent dans l'autre langue) à `BaseLayout`, qui génère `hreflang` et le sélecteur.
- Nouvelle page : ajouter la route dans `routes.ts`, un gabarit dans `gabarits/` (documenté dans `systeme.yaml`), deux fichiers minces dans `pages/` et `pages/en/`.
- Textes d'interface : `content/fr/interface.yaml` et `content/en/interface.yaml`, même structure (validée par Zod).
- Traductions : faites par Claude depuis le français, sans relecture.

### Contenu
- **Ne jamais inventer de contenu.** Ce qui manque reste « À compléter : … ».
- Les valeurs « À compléter » s'affichent en gris (`.todo`) en aperçu et font échouer le build de production (`lib/contenu.ts`).
- `statut: brouillon` : visible en aperçu seulement. Les renvois vers un contenu absent ou non publié sont masqués (avertissement au build).
- Cas et écrits sont appariés entre langues par `numero` ; les renvois (`ecritsLies`, `casCites`, `casSuivant`, `reglesEcrit`) utilisent aussi les numéros.

### Accessibilité
- WCAG 2.1 AA. Focus visible (`:focus-visible`, contour 2 px `currentColor`), lien d'évitement, un seul `h1` par page, titres hiérarchisés.
- Liens actifs : `aria-current="page"` (page exacte) ou `"true"` (sous-page).

### Bilingue (comportement)
- Première visite : français si `navigator.language` commence par `fr`, anglais sinon ; le choix est mémorisé (`localStorage.langue`). Le sélecteur de langue écrase ce choix. Script en ligne dans `BaseLayout` ; jamais de redirection pour les robots ni sans équivalent.

### Animations
- Méthode (desktop, avec JS, sans reduced-motion) : figure collée, pilier actif ; les textes des autres passent en gris (contraste AA conservé).
- Sections `[data-apparition]` : fondu unique à l'entrée dans l'écran.
- Entrées de liste (`.entree`) : au survol ou au focus, fond gris léger qui balaie la ligne de gauche à droite.
- **Les étiquettes de strate ne sont jamais animées** : elles ne sont pas interactives.
- Ne rien ajouter qui ne soit pas dans la maquette sans le demander d'abord (ex. : pas de strates dans la colonne bleue du hero).

## Déploiement

Vercel (`vercel.json` : adresses propres, sans barre finale). Les déploiements de prévisualisation construisent en mode aperçu (`VERCEL_ENV=preview`) ; la production refuse les « À compléter ». Aucune modification de DNS : florianbutour.com basculera plus tard.

## Méthode de travail

Étapes : 1. pile ✔ · 2. squelette ✔ · 3. composants ✔ · 4. gabarits et contenus ✔ · 5. i18n ✔ · 6. animations ✔ · 7. qualité ✔ (axe sans violation, Lighthouse mobile 100 × 4).
Vérifications : `npm run build:apercu`, axe-core (devDependency) dans le navigateur, Lighthouse sur `dist/` servi compressé.
