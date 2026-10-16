# Ajouter du contenu en cinq minutes

Tout le contenu vit dans `content/`, un dossier par langue. Aucun fichier de code à toucher.

```
content/
  fr/                         en/
    interface.yaml              interface.yaml        textes d'interface, contact, CV
    accueil.yaml                accueil.yaml          page d'accueil
    parcours.yaml               parcours.yaml         page Parcours
    travaux/<slug>.md           work/<slug>.md        un fichier par cas
    ecrits/<slug>.md            writing/<slug>.md     un fichier par écrit
  _modeles/cas.md, ecrit.md                           fichiers modèles à copier
```

## Ajouter un cas

1. Copiez `content/_modeles/cas.md` dans `content/fr/travaux/mon-cas.md`.
2. Remplissez le frontmatter (entre les `---`). Choisissez un `numero` qui n'est pas déjà pris : c'est lui qui relie les deux langues et les renvois entre contenus (`ecritsLies`, `casSuivant`, `casCites`).
3. Écrivez le corps (voir « Écrire le corps » plus bas).
4. Laissez `statut: brouillon` tant que ce n'est pas prêt.
5. Lancez `npm run dev` et ouvrez http://localhost:4321/travaux/mon-cas.
6. Pour la version anglaise : même fichier dans `content/en/work/`, même `numero`. Le `slug` peut être traduit. Si la traduction manque, la version française est servie à l'adresse anglaise, sans mention.
7. Quand c'est prêt : `statut: publie`.

## Ajouter un écrit

Même chose avec `content/_modeles/ecrit.md`, copié dans `content/fr/ecrits/` (et `content/en/writing/`).

## Écrire le corps

| Vous écrivez | Vous obtenez |
| --- | --- |
| `## Le modèle` | Cas : une nouvelle section, numérotée automatiquement (« 03 · Le modèle »). Écrit : un intertitre. |
| `### Descendre dans l'installation` | Cas : le grand titre de la section. |
| `::decisions` (seul sur sa ligne) | Cas : place les blocs « Décisions » et « Règles » du frontmatter. |
| `> Une phrase` | Citation à filet bleu. |
| `:::lead` … `:::` | Paragraphe en grand (Lead/22). |
| `:::question` … `:::` | Question finale, en bleu. |
| `![Description](/images/cas/ecran.png "Légende")` | Image avec légende. Le texte alternatif est obligatoire. Placez l'image dans `public/images/…`. |
| `![Description](a-completer "Légende")` | Emplacement gris en attendant l'image. |
| Bloc ` ```figure ` en YAML | Figure de modèle : `arborescence`, `strates` ou `parcours` (exemples dans le cas Desoutter et l'écrit 07). |

Dans un écrit, le premier paragraphe s'affiche automatiquement en chapô.

## Les « À compléter »

Tout texte qui commence par « À compléter » :

- s'affiche en gris en développement et dans les aperçus ;
- **fait échouer le build de production**, avec la liste des fichiers et des champs en cause.

Pour publier malgré un brouillon incomplet, laissez-le en `statut: brouillon` : il ne sera pas mis en ligne.

## Vérifier avant de publier

```bash
npm run build          # build de production : refuse les « À compléter » publiés
npm run build:apercu   # aperçu : brouillons visibles, « À compléter » en gris
```

Une faute de saisie (champ manquant, slug invalide, image sans `alt`) arrête le build avec le fichier et le champ en cause.

## Typographie

Écrivez naturellement, avec une espace avant `:`, `;`, `?`, `!` et à l'intérieur des guillemets « ». Les espaces insécables sont posées automatiquement sur les pages françaises.

## Textes d'interface, contact et CV

`content/<langue>/interface.yaml` contient la navigation, le pied de page, l'adresse du profil LinkedIn et le lien du CV. Pour le CV, placez le PDF dans `public/cv/` (par exemple `public/cv/florian-butour-cv-fr.pdf`), puis indiquez `url: /cv/florian-butour-cv-fr.pdf`.

## Après un changement de schéma

Si le serveur de développement affiche des données périmées après une modification de `src/content.config.ts`, relancez-le avec `npm run dev:clean`.
