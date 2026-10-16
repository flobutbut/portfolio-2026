---
# Écrit de démonstration, repris de la maquette Figma (nœud 28:342).
numero: 7
slug: l-ecran-devient-jetable
statut: brouillon
titre: L’écran devient jetable, le système non
these: Quand l’interface devient interchangeable, la valeur et le travail de conception se concentrent dans les objets, les états et les règles que toutes les surfaces partagent.
genre: Prise de position
strates:
  surfaces: false
  designSystem: false
  modele: true
tempsLecture: 6
casCites: [1]
ecritsLies: [5, 6]
limites: |
  Certaines interfaces restent le produit lui-même : la visualisation spatiale, l’exploration, la supervision d’un système en temps réel. Là, l’écran n’est pas jetable, et cet écrit ne prétend pas le contraire.

  Et si des standards ouverts rendent l’objet partagé portable, celui qui l’héberge devient remplaçable à son tour. La thèse porte sur la valeur de la conception du modèle, pas sur l’avantage de celui qui le détient.
---

Il y a peu, concevoir et construire une interface prenait des semaines. Aujourd’hui, un product manager équipé d’un assistant obtient un prototype fonctionnel dans l’après-midi. Et beaucoup d’utilisateurs n’ouvriront bientôt plus l’interface du tout : ils formuleront une intention, et un agent fera le reste.

On en tire souvent une conclusion rapide : si l’interface ne coûte plus rien, le logiciel perd sa valeur, et le design avec lui.

Je crois que cette conclusion confond deux choses : l’interface d’un logiciel, et ce qu’elle donne à manipuler.

## Remplacer l’interface n’est pas remplacer le système

Imaginons une équipe produit dans deux ans. La designer travaille dans son outil, le développeur dans son IDE, la responsable produit dans un chat. Chacun a son agent, sa surface préférée. Plus personne n’a besoin d’ouvrir la même application.

Pourtant, ils doivent toujours s’accorder sur les mêmes choses. Où en est le projet ? Quelle décision a été prise, par qui, pourquoi ? Qui a le droit de modifier quoi ? Que se passe-t-il si deux personnes, ou deux agents, changent le même élément en même temps ?

> L’obligation de partager une application diminue. L’obligation de partager un état cohérent demeure.

On peut se représenter le logiciel en trois strates, posées sur une base technique.

```figure
type: strates
legende: Fig. 01 · Trois strates, posées sur ce que l’ingénierie possède
strates:
  - nom: Surfaces
    elements: web · mobile · chat · IDE · CLI · API · agents
    note: De plus en plus interchangeables
  - nom: Design system
    elements: tokens · composants · patterns · règles d’usage
    note: Ce qui garde les interfaces cohérentes, pour les équipes comme pour les agents
  - nom: Modèle
    elements: objets · relations · dépendances · états · droits · décisions · historique
    note: Ce sur quoi tout le monde doit s’accorder
    actif: true
base:
  elements: stockage · identités · transactions · sécurité
  note: "Hors strates : relève de l’ingénierie et de l’exploitation"
```

Les surfaces, en haut, deviennent interchangeables : chacun pourra choisir, voire générer, la sienne. Juste dessous, le design system dit comment elles se comportent ; il est de plus en plus lu par des agents autant que par des équipes. Tout en bas, la base technique relève de l’ingénierie et de l’exploitation. Entre les deux, une strate qu’on remarque rarement parce qu’on la voit toujours à travers un écran : le modèle, c’est-à-dire les objets que le produit manipule, leurs relations, les états qu’ils traversent, les règles qui disent qui peut agir sur quoi.

C’est là que se loge une grande partie de la valeur durable du logiciel. Et c’est une strate conçue, au sens fort, même quand personne ne l’a conçue délibérément.

## Un exemple : le contrat de données

Je travaille sur des produits de gouvernance des données. Un contrat de données formalise ce qui lie une équipe qui produit un jeu de données et celles qui le consomment : ce que signifient les champs, qui en répond, quelles garanties de fraîcheur et de qualité s’appliquent.

Ce contrat, on peut l’afficher dans une interface, l’interroger par API, le faire vérifier par un agent. Aucune de ces surfaces n’est le contrat.

Le travail difficile n’a jamais été l’écran. C’était de décider ce qu’est un contrat : par quels états il passe, qui peut le proposer, qui doit l’accepter, ce qui se passe quand une garantie n’est plus tenue, et comment un consommateur l’apprend avant que son tableau de bord ne se trompe.

Ces décisions survivent à toutes les interfaces. Prises avec soin, elles rendent chaque surface plus simple, y compris celles qu’on n’a pas encore imaginées. Prises à moitié, elles rendent chaque surface confuse, quelle que soit sa qualité visuelle. Aucun écran soigné ne rattrape un modèle incohérent.

## L’objection sérieuse : les agents rendront aussi la migration gratuite

On peut m’opposer ceci : si un agent sait exporter des données, convertir des formats et reconstruire des intégrations en une nuit, le modèle devient lui aussi remplaçable. Plus de verrou, plus de valeur.

C’est en partie vrai. Les données migrent de mieux en mieux, et c’est une bonne nouvelle.

Mais ce qui migre mal, ce n’est pas la donnée, c’est le sens : pourquoi tel champ porte ce nom, quelle décision a fermé telle option, quelle règle interdit telle action, quelle relation lie deux objets qui semblent indépendants. Un export transporte des valeurs, rarement des intentions.

Surtout, plus on délègue aux agents, plus ce sens doit être explicite. Un agent ne devine pas une règle qui n’existe que dans la tête de trois personnes. Il ne sait pas qu’une action est irréversible si personne ne l’a décrit comme telle.

Poussée au bout, l’objection ne réduit donc pas le besoin de modéliser : elle l’augmente. Un modèle explicite, cohérent et documenté est précisément ce qui rend possibles la migration, l’interopérabilité et la délégation.

## Ce que ça change pour le design

Le design ne disparaît pas. Il descend d’un étage. La question passe de « à quoi ressemble cet écran ? » à « quels objets, quels états, quelles transitions, qui peut faire quoi, au nom de qui, et comment revenir en arrière ? ».

Quand une machine agit au nom d’une personne, il faut décider ce que cette personne accepte de déléguer, ce qu’on lui demande de confirmer, comment elle voit après coup ce qui a été fait, et comment elle reprend la main. Ce ne sont pas des questions d’implémentation. Ce sont des questions de compréhension humaine.

L’ingénierie définit ce que le système peut faire : capacités, permissions, mécanismes d’exécution et de retour arrière. Le design travaille sur ce que l’humain comprend, accepte de déléguer et peut contrôler. L’un ne va pas sans l’autre.

Les livrables évoluent en conséquence : modèles d’objets, diagrammes d’états, matrices de permissions et d’autonomie, règles de composition assez structurées pour guider à la fois les équipes et les agents. Un bon résultat peut encore être un écran. Il peut aussi être un modèle qui évite à cinq équipes de concevoir cinq versions du même concept.

## Ce qui reste quand l’écran s’efface

Bien concevoir, pour moi, a toujours consisté à retirer ce qui n’a pas lieu d’apparaître. Un bon système absorbe la complexité au lieu de la faire porter à ceux qu’il sert. Il s’efface tant qu’il travaille.

L’IA pousse cette idée à son terme : l’interface elle-même peut s’effacer. Ce qui reste, c’est le système qui travaille dessous. Et il faut toujours quelqu’un pour le concevoir.

:::question
Dans votre produit, qu’est-ce qui survivrait si plus personne n’ouvrait l’interface ?
:::
