# Portfolio Florian Butour

Site statique bilingue (FR à la racine, EN sous `/en`) construit avec **Astro 7**. Le site prouve qu'on peut rendre lisibles des systèmes techniques complexes. Performance, accessibilité et propreté du code font partie du message : les ingénieurs ouvriront les outils de développement.

Principe directeur : **retirer avant d'ajouter**. Pas de dépendance, de script ou de style sans besoin démontré. Le mouvement n'existe que s'il révèle une structure.

## Commandes

```bash
npm run dev       # serveur de développement, http://localhost:4321
npm run dev:clean # idem après avoir vidé le cache de contenu (à faire après un changement de schéma)
npm run build     # astro check (types) puis build statique dans dist/
npm run preview   # sert dist/ localement
npm run check     # vérification des types seule
```

Node 22.22 ou plus.

## Structure

```
content/<langue>/          Contenus éditoriaux (Markdown et YAML), un dossier par langue
  interface.yaml           Textes d'interface (navigation, contact, 404)
src/
  content.config.ts        Collections et schémas Zod : une erreur de saisie casse le build
  i18n/routes.ts           Table unique des adresses FR ↔ EN (navigation, hreflang, sitemap)
  i18n/ui.ts               getInterface(locale) : textes d'interface validés
  lib/todo.ts              Repérage des valeurs « À compléter »
  styles/tokens.css        Jetons (couleurs, échelle typographique fluide, mise en page)
  styles/global.css        Réinitialisation, classes de style de texte, utilitaires
  styles/fonts.css         @font-face des polices auto-hébergées
  layouts/BaseLayout.astro <html lang>, <head>, lien d'évitement, navigation, contact
  components/              Un composant par composant Figma, même nom (sans « Strates/ »)
  views/                   Gabarits de page partagés entre FR et EN, reçoivent `locale`
  pages/                   Fichiers minces : importent une vue et passent la langue
public/fonts/              Archivo et Schibsted Grotesk (woff2 variables, licences OFL)
docs/                      Notes de décision et guides
```

## Sources de vérité

- **Figma** `AqUur6HhWyKnXAJwEwx1Ol` (MCP Figma officiel disponible) : accueil `1:14`, travaux `9:1314`, écrits `9:1861`, parcours `9:1964`, cas `27:316`, écrit `28:342`, page « Composants » `9:773`.
- Quand une maquette contredit le brief ou une règle ci-dessous : **signaler, ne pas trancher seul**.
- Arbitrages déjà rendus : intitulé « Senior Product Designer » ; `text/muted` = #737373 (et non #8A8A8A) ; Caption en 13 px ; marge unique de 56 px ; sélecteur de langue « EN / FR » après Contact ; favicon « FB. » sur carré bleu ; strates du brief (surfaces, design system, modèle) partout ; strate Off en `text/supporting` #5C5C59 ; bandeaux de strate de 28 px ; interligne UI 20 px.

## Conventions

### Jetons et styles
- Couleurs : uniquement les rôles `--color-<groupe>-<nom>` de `tokens.css`. Jamais de valeur en dur dans un composant.
- Un seul accent : le bleu `--color-background-brand`, en aplat. Sur le bleu, jamais `--color-text-muted`.
- Texte : classes `.text-display`, `.text-heading-40`, `.text-heading-24`, `.text-lead`, `.text-body`, `.text-body-strong`, `.text-ui`, `.text-caption`, `.text-label` (mêmes noms que les styles Figma).
- Les capitales passent par `.text-label`, jamais tapées dans le contenu.
- Échelle fluide entre 375 et 1 440 px ; Body (17), UI (15), Caption (13/20) et Label (12) ne descendent jamais sous leur taille.
- **Toutes les dimensions en pixels sont des nombres pairs** (tailles, interlignes, espacements, bordures).
- Une seule marge latérale : `--layout-gutter`, 56 px sur desktop, 20 px sur mobile.
- Points de rupture : mobile `< 40rem`, tablette `40rem–64rem`, desktop au-delà.
- `prefers-reduced-motion` : `--motion-duration` passe à 0 ; tout s'affiche dans son état final.

### Composants
- Catalogue (noms Figma de la page « Composants ») : `Bouton` (plein, contour), `Strate` (On/Off), `StratesTouchees` (les trois strates, verticale ou horizontale), `Navigation`, `EnTeteDeSection`, `EntreeDeProjet` (avec ou sans visuel), `PilierDeMethode`, `EntreeDEcrit`, `Contact`.
- Banc d'essai en développement : http://localhost:4321/systeme/composants (aucune page générée en production).
- Styles limités au composant (`<style>` Astro) ; classes en BEM léger (`bloc__element--variante`).
- Scripts : `<script>` natifs dans le composant, en amélioration progressive. La page doit fonctionner sans JavaScript.
- Aucun framework client tant qu'aucun besoin interactif ne l'exige (l'intégration Vue n'est pas installée).
- Navigation mobile (`< 40rem`) : menu burger plein écran construit sur l'API Popover native (fonctionne sans JavaScript).

### Bilingue
- Toute adresse passe par `path(key, locale, slug?)` de `src/i18n/routes.ts`. Ne jamais écrire une adresse en dur.
- Chaque page passe `alternate` (adresse de l'équivalent dans l'autre langue) à `BaseLayout`, qui génère `hreflang` et le sélecteur.
- Nouvelle page : ajouter la route dans `routes.ts`, une vue dans `views/`, deux fichiers minces dans `pages/` et `pages/en/`.
- Textes d'interface : `content/fr/interface.yaml` et `content/en/interface.yaml`, même structure (validée par Zod).
- Traductions : faites par Claude depuis le français, sans relecture.

### Contenu
- **Ne jamais inventer de contenu.** Ce qui manque reste « À compléter : … ».
- Les valeurs « À compléter » s'affichent en gris (`.todo`) en développement et doivent faire échouer le build de production (contrôle ajouté à l'étape 7).

### Accessibilité
- WCAG 2.1 AA. Focus visible (`:focus-visible`, contour 2 px `currentColor`), lien d'évitement, un seul `h1` par page, titres hiérarchisés.
- Liens actifs : `aria-current="page"` (page exacte) ou `"true"` (sous-page).

## Déploiement

Vercel (`vercel.json` : adresses propres, sans barre finale). Nouveau projet, aucune modification de DNS : florianbutour.com basculera plus tard.

## Méthode de travail

Étapes : 1. pile ✔ · 2. squelette, jetons, navigation, pied de page ✔ · 3. composants Figma ✔ · 4. gabarits et contenus de démonstration · 5. i18n (détection de langue, mémoire du choix) · 6. animations · 7. passe qualité. Pause et démonstration à la fin de chaque étape.
