---
# Repris de docs/Portfolio/02c_Cas_03_Data_contracts.md. Les « Visuel prévu » n’apparaissent qu’en aperçu tant qu’ils ne sont pas fournis.
numero: 3
slug: data-contracts
statut: publie
titre: "Rendre explicites les engagements autour des données"
chapo: "Chez Qlik, je conçois un outil de data contracts pour expliciter les engagements entre les équipes qui produisent un dataset et celles qui l’utilisent. L’enjeu : relier ces engagements aux informations et aux mesures de qualité déjà présentes dans la plateforme. Ce travail est en cours."
meta: "Qlik · Intégration de données"
strates:
  surfaces: false
  designSystem: false
  modele: true
visuel:
  src: /images/data-contracts/apercu.svg
  alt: "Illustration isométrique : un dataset en couches, relié aux équipes qui l’utilisent"
cartouche:
  role: "Senior Product Designer"
  duree: "Depuis juin 2025, en cours"
  equipe: "Un Product Manager, un Product Owner, des développeurs front-end et back-end"
  livrables: "Modèle du contrat, patterns d’usage, prototypes en code"
ecritsLies: [2, 5]
casSuivant: 4
---

Depuis juin 2025, je suis Senior Product Designer sur l’intégration de données chez Qlik, au moment où les produits Talend et Qlik convergent après le rachat. J’y travaille avec un Product Manager, un Product Owner et des développeurs front-end et back-end.

## Formaliser ce qui est attendu des données

Ce que signifie une colonne, qui en répond, quelle fraîcheur ou quelle qualité on peut en attendre : un contrat réunit ces engagements pour que producteurs et consommateurs puissent s’y référer. Certaines informations décrivent le sens des données ou les responsabilités ; d’autres peuvent être associées à des contrôles. Déclarer un engagement et vérifier qu’il est tenu sont deux fonctions distinctes.

```figure
type: schema
legende: "Fig. 01 · Avant : entre ceux qui produisent un dataset et ceux qui l’utilisent, des attentes que chacun suppose et que personne n’a écrites."
blocs:
  - chaine:
      - { objet: "Producteurs", description: "l’équipe qui publie le dataset" }
      - { liaison: "publie" }
      - { objet: "Dataset", description: "une table, ses colonnes" }
      - { liaison: "alimente" }
      - { objet: "Consommateurs", description: "les équipes et usages qui en dépendent" }
  - puces:
      intitule: "Ce que chacun suppose, écrit nulle part"
      pointille: true
      elements:
        - { texte: "Que signifie cette colonne ?", ton: gris }
        - { texte: "Qui en répond ?", ton: gris }
        - { texte: "Quelle fraîcheur ?", ton: gris }
        - { texte: "Quelle qualité ?", ton: gris }
```

## La démarche : définir l’engagement avant de dessiner l’écran

Avant de définir les écrans, j’ai commencé par décrire ce qu’est un contrat : qui le propose, qui l’accepte, ce qu’il garantit, par quels états il passe, et ce qui se passe quand il n’est plus tenu.

Dans le modèle proposé, le contrat constitue un objet du produit à part entière, avec un responsable et un cycle de vie à définir.

## Partir de ce qui existe déjà

Le contrat ne naît pas de rien : il s’appuie sur un dataset qui a déjà ses propres mesures de qualité, par dimensions et par règles de validation. La première question n’était donc pas « à quoi ressemble un contrat ? », mais « quelle relation le lie au dataset ? ».

J’ai choisi de m’appuyer sur ces mesures plutôt que de créer un second système de mesure propre aux contrats. Cette relation devait éviter de dupliquer la description de la qualité. Elle ne dispense pas de préciser ce que chaque engagement exige : une mesure commune et le seuil attendu par un consommateur ne sont pas la même chose.

Pour illustrer cette distinction, imaginons un engagement de mise à jour avant 8 heures. L’heure de dernière mise à jour constitue une mesure ; « avant 8 heures » exprime l’attente ; leur comparaison permet d’évaluer le respect de cet engagement. Cet exemple explique le principe, sans décrire une fonctionnalité livrée.

## De la liste aux patterns

Nous avons d’abord listé tout ce qu’un contrat peut garantir, puis donné des règles à chaque type de garantie : certaines se répètent, d’autres sont uniques par nature. Nous avons utilisé ces règles pour structurer les types de garanties et concevoir des patterns d’usage destinés à leur création, leur édition et leur suivi.

L’objectif est de partager le vocabulaire et les comportements récurrents, tout en conservant les différences entre types de garanties. Les écrans et les prototypes permettent ensuite d’éprouver ces règles.

```figure
type: schema
legende: "Fig. 02 · Le contrat s’appuie sur le dataset : il réutilise ses mesures de qualité au lieu d’en inventer, et garantit leur respect à ceux qui en dépendent."
blocs:
  - chaine:
      - { objet: "Dataset", description: "ses mesures de qualité : dimensions, règles de validation" }
      - { liaison: "réutilise", sens: gauche }
      - { objet: "Data contract", description: "des garanties explicites, vérifiées par le système, avec un responsable", emphase: true }
      - { liaison: "garantit à" }
      - { objet: "Consommateurs", description: "les équipes et usages qui dépendent des données" }
```

## Le prototype comme outil de décision

J’ai prototypé en code, avec Claude et Figma Make, pour rendre les comportements manipulables lors des échanges avec l’ingénierie. Le prototype sert de support à la discussion ; il ne constitue pas à lui seul une validation des règles ou de leur utilisabilité.

## Résultat et limites

Ce travail est en cours. Le cas présente la démarche de modélisation et de prototypage ; il ne revendique pas de résultat de déploiement ni d’impact mesuré sur les utilisateurs.
