# Décision : pile technique

*16 octobre 2026 · statut : en attente de validation*

## Point de départ

Le brief propose Nuxt 3. Nuxt 3 n'est plus maintenu depuis début 2026 : la comparaison porte donc sur **Nuxt 4.6** (avec Nuxt Content 3 et `@nuxtjs/i18n` 10) face à **Astro 7.4** (avec `@astrojs/vue` disponible au besoin). Les deux génèrent un site statique déployable sur Vercel sans configuration.

## Comparaison sur les cinq critères

| Critère | Nuxt 4 (génération statique) | Astro 7 | Avantage |
| --- | --- | --- | --- |
| **1. Prérendu** | HTML complet sur chaque page. Chaque page porte aussi la charge de réhydratation (état sérialisé et environnement Vue). | HTML complet, rien d'autre. | Égalité sur le contenu lisible ; Astro produit un HTML plus propre. |
| **2. Contenu typé** | Nuxt Content 3 : collections et schémas Zod. En statique, les requêtes côté client passent par un export SQLite chargé dans le navigateur (WASM) dès qu'une navigation interroge le contenu. | Collections de contenu natives, schémas Zod, chargeur de fichiers. Une erreur de frontmatter fait échouer le build en nommant le fichier et le champ. Rien n'est livré au navigateur. | **Astro** |
| **3. i18n FR/EN** | Module mûr : stratégie « français à la racine », adresses traduites (`/travaux` ↔ `/en/work`), `hreflang` générés, détection de langue intégrée. | Routage i18n natif (`prefixDefaultLocale: false`). Les adresses traduites s'écrivent comme deux arborescences de pages ; `hreflang`, correspondance entre pages et sélecteur de langue sont à écrire (environ 100 lignes, une table de routes). | **Nuxt**, mais l'écart est court et maîtrisé |
| **4. JavaScript livré / Lighthouse** | Le socle (Vue, routeur, Nuxt) pèse environ 60 Ko compressés sur chaque page, même sans interaction. 95 sur mobile reste atteignable, au prix d'efforts constants. | Zéro JavaScript par défaut. Les seuls scripts prévus (méthode collée, révélation des strates, copie de l'e-mail, mémoire de la langue) tiennent dans quelques Ko de TypeScript sans dépendance. | **Astro**, nettement |
| **5. Animations de défilement** | Composables Vue autour d'`IntersectionObserver`. | Le même code, sous forme de scripts natifs liés aux composants. Aucun îlot Vue n'est nécessaire pour ces animations. | Égalité, avec un léger avantage à Astro (moins de couches) |

**Besoins annexes du brief** : les deux couvrent sitemap, `llms.txt` et `content.json` (points d'accès prérendus), images Open Graph générées au build (Satori), typographie française (plugin remark/rehype) et Vercel Analytics.

## Recommandation : Astro

Le site est un document, pas une application. Le premier message envoyé aux ingénieurs qui ouvrent les outils de développement est : « ce site ne livre que ce qui sert ». Astro le permet sans effort ; avec Nuxt, il faut le défendre en permanence. Le principe « retirer avant d'ajouter » s'applique aussi à la pile.

Mise en œuvre prévue :
- Composants `.astro` pour les gabarits ; l'intégration Vue n'est installée que lorsqu'un vrai besoin interactif apparaîtra (aucun pour l'instant).
- Collections `cas` et `ecrits` validées par Zod, avec un contrôle propre au site : statut publié, champs « À compléter » refusés en production, liens entre cas et écrits vérifiés.
- Une table de routes FR ↔ EN unique, qui alimente le sélecteur de langue, les `hreflang` et le sitemap.
- Langue à la première visite : petit script sur les pages françaises qui redirige vers `/en` si `navigator.language` ne commence pas par `fr`, sauf si un choix a été mémorisé ou si le visiteur est un robot. Le choix fait dans la navigation est mémorisé et prime.
- Contenu non traduit (réponse à la question 1) : comme Claude traduit chaque contenu, le build vérifie que chaque cas et chaque écrit existe dans les deux langues. Si une traduction manque, la version anglaise reprend le texte français en `lang="fr"`, sans mention, et un avertissement s'affiche dans le build.

## Ce qu'on perd en écartant Nuxt

- **Vue partout.** Les gabarits s'écrivent en `.astro` (syntaxe proche du HTML et du JSX), pas en SFC Vue. Florian lit et modifie un fichier `.astro` sans difficulté, mais ce n'est pas l'outil qu'il connaît.
- **Le confort du module i18n.** Helpers comme `localePath`, en-têtes SEO automatiques, détection intégrée : ils sont à écrire nous-mêmes. C'est peu de code, mais il faut le maintenir.
- **La navigation d'application.** Pas de transitions entre pages côté client par défaut. Astro propose les View Transitions natives du navigateur si on en veut un jour.
- **Une marge vers l'applicatif.** Si le site devait devenir une application (espace connecté, outils interactifs riches), Nuxt serait plus naturel. Astro gère du rendu serveur et des îlots Vue, ce qui couvre largement l'horizon d'un portfolio.

## Ce qui ne change pas selon le choix

Vercel (nouveau projet, aucun DNS), TypeScript strict, polices auto-hébergées, jetons en variables CSS `--color-<groupe>-<nom>`, contenus Markdown et YAML par langue, figures de modèle en SVG alimentées par des données.
