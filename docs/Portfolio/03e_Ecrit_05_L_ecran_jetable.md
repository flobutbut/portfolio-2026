# Écrit 05 · Plusieurs interfaces, un même produit

*Thèse : lorsqu'un produit est accessible par plusieurs interfaces, sa cohérence dépend des objets, des états et des règles qu'elles partagent, autant que de la qualité propre à chaque interface.*

---

On peut réserver une salle depuis une application web, un téléphone ou une invitation de calendrier. Les gestes et les informations visibles changent. La réservation doit pourtant conserver le même sens : quel espace, pour qui, à quel moment et avec quels droits de modification.

Cette question précède l'arrivée des agents. Leur capacité à agir par différents points d'accès la rend plus pressante : comment permettre plusieurs façons d'utiliser un produit sans multiplier les versions de ses règles ?

## Une interface expose une partie du produit

Chez SharingCloud, WorkplaceToBe existait sur le web, sur mobile, dans Outlook et sur des équipements placés dans les espaces de travail. Ces interfaces ne reprenaient pas toutes les mêmes fonctions. Une invitation Outlook et un écran devant une salle permettaient d'aborder la réservation dans des situations différentes.

Le travail consistait à conserver le sens des objets et des usages tout en adaptant leur représentation. Le modèle de données existait déjà côté back-end ; mon rôle portait sur les objets manipulés dans l'interface et la cohérence de leurs déclinaisons.

Partager un produit ne veut donc pas dire reproduire le même écran partout. Cela demande de décider ce qui doit rester commun et ce que le contexte justifie de changer.

## Ce qui doit rester commun

Je distingue trois éléments complémentaires :

- **Le modèle du produit** : ses objets, leurs relations, leurs états et les règles qui gouvernent les actions.
- **Les points d'accès** : interfaces graphiques, ligne de commande ou API, chacun exposant une partie des possibilités du produit.
- **Les repères de conception** : composants, patterns et règles de contenu qui aident les équipes à construire des expériences cohérentes.

Un agent est un acteur qui utilise ces accès, pas une interface du même ordre qu'une API. Et le design system ne fait pas respecter à lui seul les règles métier : les permissions, les contrôles et la gestion des modifications concurrentes doivent être assurés par le système.

Ces décisions demandent un travail commun entre design, produit et ingénierie. Déterminer qui peut modifier quoi et comment une personne comprend un refus engage à la fois le fonctionnement du logiciel et son usage.

## Un exemple : le contrat de données

Chez Qlik, je travaille sur un outil de contrats de données. Un contrat formalise des engagements entre les équipes qui produisent un jeu de données et celles qui l'utilisent : le sens des champs, les responsabilités ou les attentes de qualité et de fraîcheur.

Dans ce projet en cours, une difficulté structurante consiste à définir la relation entre le contrat et les mesures déjà présentes sur le jeu de données. Il faut distinguer les engagements déclarés, les contrôles possibles et ce que leurs résultats permettent d'affirmer.

On peut envisager de présenter ces informations dans une interface ou de les rendre accessibles par API. Dans les deux cas, les mots, les états et les règles doivent rester compatibles. Une représentation différente ne devrait pas transformer un engagement non vérifié en garantie tenue.

Cet exemple montre pourquoi la conception du modèle compte au-delà d'un écran particulier. Il ne suppose pas que tous ces accès soient déjà livrés.

## Ce que la génération d'interfaces change

Dans mon travail, le prototypage assisté me permet d'explorer des comportements en construisant une version manipulable. Il facilite la discussion d'une hypothèse ; il ne supprime pas le travail nécessaire pour en faire un produit utilisable et maintenable.

L'accessibilité, la lisibilité, les erreurs, les contraintes du contexte et la découverte des fonctions restent à concevoir et à vérifier. Un écran rapide à générer peut encore être difficile à comprendre.

La possibilité de multiplier les interfaces renforce toutefois l'intérêt de règles partagées. Si chaque nouvelle représentation doit redéfinir ce qu'est une réservation ou un contrat, la cohérence du produit dépend de décisions locales qui risquent de diverger.

Un modèle explicite aide aussi à discuter l'interopérabilité et la migration. Il ne garantit ni leur simplicité ni la valeur économique du logiciel : les dépendances techniques et les usages existants continuent de compter.

## Un modèle commun ne résout pas tous les usages

Une ligne de commande n'est pas une interface graphique réduite à du texte. Un écran de salle ne répond pas aux mêmes contraintes qu'une application utilisée pour préparer sa semaine. Chaque accès demande un travail propre sur les actions disponibles, les informations utiles et les retours après une opération.

Cette adaptation peut révéler une faiblesse du modèle lui-même. Le travail ne descend donc pas seulement des règles vers les écrans : les usages rencontrés sur une nouvelle interface peuvent conduire à revoir les règles communes.

Quand un agent agit au nom d'une personne, il faut également définir le périmètre de sa délégation et la façon dont elle garde la main. C'est le sujet de l'écrit 04.

La question que je retiens est concrète : si une nouvelle interface accédait demain au produit, quelles règles pourrait-elle réutiliser, et lesquelles faudrait-il encore clarifier ?

---

**Cas cités** : WorkplaceToBe (des usages communs adaptés à plusieurs surfaces) · Data contracts (des engagements à distinguer de leurs contrôles).

**Écrits liés** : 02 · Le modèle avant l'écran · 04 · L'IA, deuxième usager du produit.
