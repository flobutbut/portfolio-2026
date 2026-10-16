# Design system

Le système « Strates » de la nouvelle page d'accueil (fichier Figma « Untitled », cadre « C · Accueil — Les strates »), relevé le 15 octobre : 16 jetons couleur en un seul mode, 9 styles de texte construits sur des variables primitives. Il remplace le système « plan coté » de Portfolio-CDI, résumé en archive en bas de l'onglet. Cet onglet reste la référence pour le code.

Principe : trois couleurs portent la page. Le blanc pour lire, le bleu pour affirmer, le noir pour identifier. Deux familles de caractères : Archivo pour les titres, Schibsted Grotesk pour tout le reste.

## Les strates

Trois strates officielles depuis le 16 octobre, toujours dans cet ordre : **Surfaces, Design system, Modèle**.

- **Surfaces** : les endroits où l'on rencontre le produit (web, mobile, Outlook, CLI, API, agents). Le mot remplace « Interfaces », qui faisait attendre du responsive.
- **Design system** : les règles qui traduisent le modèle en surfaces, quoi utiliser et surtout quand.
- **Modèle** : l'architecture interne du produit, ses objets, leurs relations et dépendances, leurs états, les droits. Le mot remplace « Objets », qui ne nommait que les éléments.

La base technique (stockage, identités, transactions, sécurité) relève de l'ingénierie et reste hors strates : « Infrastructure » faisait penser à un métier. Ce qui compte n'est pas une strate mais ce qui les traverse : un même objet, tenu par les mêmes règles, présent sur chaque surface. Légende commune du site : surtitre du hero, section Strates de l'accueil, étiquettes des cas, figure de l'écrit 07.

## Couleurs

Un seul mode. Il n'y a pas de mode sombre : les sections noires (barre d'identité, contact) jouent ce rôle dans la page. Les usages sont relevés sur la maquette.

| Jeton | Valeur | Usage | Contraste |
| --- | --- | --- | --- |
| background/canvas | #FFFFFF | Fond de page | — |
| background/brand | #1F2BE0 | Colonne du hero, bloc Position, étiquettes de strate actives | — |
| background/inverse | #0D0D0D | Barre d'identité, contact | — |
| surface/inactive | #E7E7E7 | Étiquette de strate inactive | — |
| surface/placeholder | #D4D4D4 | Emplacement de figure pas encore livré | — |
| text/primary | #0D0D0D | Titres et texte courant | 19,4:1 sur canvas |
| text/secondary | #2A2A2A | Texte de second plan | 14,3:1 sur canvas |
| text/muted | #737373 | Méta, légendes | 4,7:1 sur canvas |
| text/inverse | #FFFFFF | Texte sur bleu ou sur noir | 8,5:1 sur brand, 19,4:1 sur inverse |
| text/on-brand-secondary | #DADDFF | Texte secondaire sur bleu | 6,3:1 sur brand |
| text/on-brand-muted | #FFFFFF à 80 % | Légendes sur bleu | environ 5,9:1 sur brand |
| text/on-dark-muted | #9A9A9A | Texte secondaire sur noir | 6,2:1 sur inverse |
| border/default | #E7E7E7 | Séparateurs discrets entre lignes | décoratif |
| border/ink | #0D0D0D | Filet sous les titres de section, contour du bouton secondaire | — |
| border/white | #FFFFFF | Contour sur fond sombre | — |
| border/on-dark | #333333 | Séparateurs sur noir | — |

Règles :

1. Un seul accent, le bleu, toujours en aplat. Le texte bleu sur blanc passerait (8,5:1) mais reste réservé aux liens.
2. Sur le bleu, le texte passe par text/inverse, text/on-brand-secondary ou text/on-brand-muted, jamais par text/muted.
3. Le noir encadre l'identité : la barre sous le hero et le contact. Pas de troisième fond.
4. text/muted (4,7:1) sert à la méta, à partir de 12 px, jamais à une phrase qu'on doit lire.
5. Variables CSS : `--color-<groupe>-<nom>` (par exemple `--color-background-brand`).

## Typographie

Deux familles : Archivo (Black et ExtraBold) pour les titres, avec une approche serrée ; Schibsted Grotesk (Regular et Medium) pour le texte et l'interface. Chaque style est composé de variables primitives : `family/…`, `size/…`, `line-height/…`, `weight/…`.

| Style | Police | Taille / interligne | Approche | Rôle |
| --- | --- | --- | --- | --- |
| Strates/Display/64 | Archivo Black | 64 / 60 | −6 % | Titre de page, accroche du hero, phrase du bloc Position |
| Strates/Heading/40 | Archivo ExtraBold | 40 / 40 | −3,5 % | Titres de section : Travaux, Méthode, Écrits, sections d'un cas |
| Strates/Heading/24 | Archivo ExtraBold | 24 / 24 | −3,5 % | Titres de cas, de piliers, d'écrits, intertitres d'article |
| Strates/Lead/22 | Schibsted Grotesk Regular | 22 / 30 | 0 | Chapô, phrase de la colonne bleue, barre d'identité |
| Strates/Body/17 | Schibsted Grotesk Regular | 17 / 26 | 0 | Texte courant |
| Strates/Body/17 Strong | Schibsted Grotesk Medium | 17 / 26 | 0 | Début de phrase appuyé (« Plutôt que : », « Data products : ») |
| Strates/UI/15 | Schibsted Grotesk Medium | 15 / 19 | 0 | Navigation, boutons, liens de suite |
| Strates/Caption/12 | Schibsted Grotesk Regular | 12 / 14 | 0 | Étiquettes de strate, méta, légendes de figure |
| Strates/Label/12 | Schibsted Grotesk Regular, capitales | 12 / 14 | 0 | Surtitres et libellés de section |

Règles : Archivo ne sert qu'aux titres, jamais à une phrase de plus de trois lignes. Les capitales passent par Label/12, jamais par une surcharge ; un début de phrase appuyé passe par Body/17 Strong, jamais par une graisse appliquée à la main. L'interligne de Heading/24 est à 100 % : à surveiller sur les titres en deux lignes.

## Grille et espacement

Desktop : 1 440 px, marges de 56 px, contenu sur 1 328 px. Le hero partage la largeur en 996 + 444 px, la colonne de droite en bleu. Chaque titre de section repose sur un filet border/ink. Aucune variable d'espacement ni de grille n'est encore relevée dans le fichier.

## Composants

Nomenclature : `Famille/Nom`, en français, avec des propriétés qui portent un sens. Le relevé ci-dessous vient des instances de la page d'accueil ; les noms des composants maîtres sont à confirmer dans Figma.

| Élément | Statut | Variantes | Usage |
| --- | --- | --- | --- |
| Strates/Navigation | Composant | — | Monogramme « FB. » et quatre entrées : Travaux, Écrits, Parcours, Contact |
| Entrée de navigation | Composant (instances « Frame 55 » à « 58 ») | — | Une entrée de l'en-tête |
| Ligne de cas | Composant (instances « Strates ») | — | Titre, décision, méta (entreprise · domaine), strates touchées |
| Étiquette de strate | Composant | État : On, Off | Une strate ou une pratique ; On en bleu, Off en surface/inactive |
| Strates/Pilier de méthode | Composant | — | Titre, phrase, pratiques en étiquettes |
| Entrée d'écrit | Composant (instances « Strates ») | — | Titre, thèse, strates touchées (trois étiquettes On ou Off, comme les cas) |
| En-tête de section | Cadre | — | Titre en Heading/40 sur filet border/ink |
| Hero, barre d'identité, Position, Contact | Cadres | — | Sections propres à l'accueil |

## Écarts ouverts

- [x] Surtitre du hero et méta des cas 2 et 3 : reportés dans Figma le 15 octobre.
- [x] Strates : tranché le 16 octobre, trois strates (surfaces, design system, modèle), la base technique hors strates ; hero, cas, modèles et écrit 07 alignés.
- [x] Styles manquants : Label/12 et Body/17 Strong créés le 16 octobre et appliqués à 51 textes (Parcours, modèles de cas et d'article, accueil).
- [ ] Barre d'identité de l'accueil : « Florian Butour » en Medium sur une ligne en 22 px, sans style. Créer Lead/22 Strong ou appliquer Lead/22 en acceptant la surcharge.
- [ ] Noms d'instances : « Strates » désigne à la fois la ligne de cas et l'entrée d'écrit, et les entrées de navigation s'appellent « Frame 55 » à « 58 ». Proposition : Cas/Ligne, Écrit/Entrée, Navigation/Entrée.
- [ ] En-tête de section : un cadre répété sur chaque page ; en faire un composant.
- [ ] Nomenclature typographique : tu avais demandé des familles Head et Body ; ici, Display, Heading, Lead, Body, UI, Caption et Label, avec la taille dans le nom. Correspondance proposée : Head/H1 = Display/64, Head/H2 = Heading/40, Head/H3 = Heading/24, Body/lg = Lead/22, Body/md = Body/17, Body/md-strong = Body/17 Strong, UI/md = UI/15, Caption/sm = Caption/12, Label/sm = Label/12.
- [ ] Étiquettes de strate des cas : états posés le 16 octobre (Desoutter : design system et modèle ; WorkplaceToBe : les trois ; data contracts : modèle), à confirmer cas par cas.
- [ ] Figure 04 de la méthode et écrans des modèles : emplacements gris (surface/placeholder) à remplacer.
- [ ] Boutons « Voir les travaux ↓ » et « CV » : vérifier qu'ils sont des composants (Action/Principale, Action/Secondaire).

## Archive : le système « plan coté »

Fichier Portfolio-CDI, page Componants : Datatype pour les titres, Geist pour le texte, Geist Mono pour les étiquettes, Doto pour la voix du système ; neutre chaud et accent orange, modes Clair et Sombre ; styles rangés en Head, Body, Signal et Label le 15 octobre. Les pages Écrits et Écrit 07 et le composant Planche/Contact y sont construits : à reprendre dans le système « Strates ».
