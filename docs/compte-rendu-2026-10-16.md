# Compte rendu — nuit du 16 octobre 2026

Les étapes 4 à 7 ont été réalisées en autonomie, avec un commit par étape. Elles sont poussées sur le dépôt privé https://github.com/flobutbut/portfolio-2026.

## Ce qui est en place

- **Pages** : accueil, travaux, écrits, parcours, cas Desoutter, écrit 07 et 404, en français et en anglais (13 pages).
- **Contenu** :
  - un fichier Markdown par cas et par écrit, et des fichiers YAML pour l'accueil, le parcours et l'interface, tous validés par des schémas ;
  - des modèles à copier dans `content/_modeles/` et un guide dans `docs/ajouter-du-contenu.md` ;
  - le cas Desoutter et l'écrit 07 sont repris des maquettes, avec les « À compléter » laissés tels quels ;
  - la traduction anglaise est faite par Claude ;
  - les deux contenus sont en `statut: brouillon`.
- **Bilingue** :
  - détection de la langue du navigateur et mémorisation du choix, sans redirection pour les robots ;
  - `hreflang` sur chaque page ;
  - repli sans mention si une traduction manque ;
  - espaces insécables françaises posées automatiquement.
- **Animations** :
  - la figure de la méthode reste collée à droite, avec un fondu entre les Fig. 04, 05 et 06 ;
  - les trois strates du hero se révèlent au défilement, en CSS seul ;
  - chaque section apparaît une seule fois ;
  - `prefers-reduced-motion` est respecté.
- **Qualité** :
  - le build de production refuse tout « À compléter » publié ; `npm run build:apercu` sert pour les aperçus ;
  - sitemap avec hreflang, robots.txt, une image Open Graph par page, `llms.txt` et `content.json` ;
  - axe : aucune violation sur les 9 pages testées ;
  - Lighthouse mobile : 100 / 100 / 100 / 100 sur les 5 pages testées (`dist/` servi compressé).

## À faire de ton côté

1. **Vercel** : le projet n'est pas créé. L'API a refusé la création (403) et la CLI n'est pas connectée sur ce poste. Il faut soit importer `flobutbut/portfolio-2026` depuis le tableau de bord Vercel, soit lancer `vercel login`, puis me demander de continuer.
   - Les déploiements de prévisualisation construisent en mode aperçu.
   - La production échouera tant qu'il restera des « À compléter » publiés, ce qui est voulu. Aujourd'hui, ce sont les liens LinkedIn et CV de `interface.yaml`.
2. **LinkedIn et CV** : renseigner l'adresse du profil et déposer le PDF dans `public/cv/`, puis mettre à jour `content/fr/interface.yaml` et `content/en/interface.yaml`.

## Points à arbitrer

1. **Strates de l'écrit 07** : la maquette ne les donne pas. J'ai mis « modèle » seul, à vérifier.
2. **Date de l'écrit 07** : inconnue. Le champ `date` est devenu facultatif plutôt que d'inventer une date.
3. **Numéros des écrits** : je les ai déduits de l'ordre de la liste Figma. Concevoir, c'est retirer = 01, Cadrer = 02, Le modèle d'objet = 03, Un design system qui dit quand = 04, Du responsive au terminal = 05, L'IA, deuxième usager = 06. Les renvois du cas Desoutter (`ecritsLies: [3, 4]`, `reglesEcrit: 4`) et de l'écrit 07 (`ecritsLies: [5, 6]`) en dépendent. Ces écrits n'existent pas encore, donc les liens sont masqués.
4. **Figures de la méthode (Fig. 04 à 06)** : la maquette ne contient qu'un emplacement gris. J'ai dessiné trois figures SVG avec les mots déjà présents dans Figma :
   - Fig. 04, un parcours fait des pratiques de « Cadrer » ;
   - Fig. 05, un graphe des facettes du modèle ;
   - Fig. 06, les trois strates, avec le design system mis en avant.

   À valider ou à remplacer.
5. ~~Hero : liste des strates ajoutée dans la colonne bleue~~ → retirée à la demande de Florian (16/10). L'animation « Hero, les trois strates » du brief n'a donc plus d'implémentation : à redéfinir.
6. **Piliers inactifs de la méthode** : leurs textes passent en gris (AA). Les étiquettes de strate ne changent plus.
7. **Figures de modèle des contenus** (arborescence, strates) : rendues en HTML sémantique plutôt qu'en SVG. Elles restent alimentées par des données et sont plus lisibles par les lecteurs d'écran, les agents et le responsive.
8. **Notes des figures sur fond gris** : elles passent en `text/supporting` pour respecter l'AA. La maquette les met en `text/muted`, à 3,8:1.
9. **Boutons du hero** : la maquette les met en UI/15 ; le composant Bouton est en Body/17. J'ai gardé le composant.
10. **Ordre des listes** : écrits et cas par numéro croissant, comme dans Figma.
