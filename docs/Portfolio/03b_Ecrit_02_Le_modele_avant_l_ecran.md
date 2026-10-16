# Écrit 02 · Le modèle avant l'écran

*Thèse : le design doit participer à la définition des objets et des règles du produit. Les écrans permettent de les éprouver et de les faire évoluer.*

---

Quand on ouvre un produit, on voit des écrans. Pourtant, l'essentiel a été décidé avant eux : quels objets existent, ce qu'on peut leur faire, qui en a le droit, ce qui est garanti. Ces décisions ne se voient presque jamais. Elles se lisent seulement à travers leurs conséquences, page après page.

C'est pour ça que je commence rarement par l'écran. « Avant » désigne ici une priorité de réflexion, pas une séquence rigide : un prototype peut aussi aider à découvrir le modèle.

## Les règles se figent tôt

Un produit se construit sur des règles : qui peut faire quoi, ce qui est garanti, ce qui est interdit, ce qui se passe quand quelque chose échoue. Ces règles se fixent tôt, dans les discussions entre Product et Engineering, souvent avant qu'un designer n'ait ouvert un fichier.

Si le design n'y est pas, il les découvre ensuite, dessinées en creux dans les écrans qu'on lui demande de produire. À ce stade, les remettre en cause reste possible, mais coûte davantage lorsque d'autres décisions et développements en dépendent.

Ma façon de travailler part de là : être présent au moment où ces règles se décident, avec ce que les utilisateurs nous ont appris, plutôt qu'au moment où il faut les mettre en page.

## Ces règles vivent dans le modèle

Une règle n'existe pas dans le vide. Elle porte sur quelque chose : un objet, ses états, ses relations avec les autres. C'est ce que j'appelle le modèle : les objets que le produit manipule, leurs relations, leurs états et les règles qui les gouvernent. Leur représentation dans les données, la navigation et les pages doit rester cohérente, sans nécessairement être identique. Un gabarit de page est une manière de présenter ce modèle, pas le modèle lui-même.

Chez Desoutter, le modèle était sous nos yeux : l'installation physique elle-même. Des contrôleurs pilotent des outils, et chaque outil a ses programmes. En fondant la navigation principale sur cette structure, chaque page devenait un niveau de l'arbre, et nous avons choisi de faire remonter l'état d'un outil jusqu'à la vue d'ensemble. La décision importante n'était pas graphique ; c'était de faire de l'installation le squelette du produit.

Sur les data contracts, chez Qlik, la première question n'était pas « à quoi ressemble un contrat ? », mais « quelle relation le lie au jeu de données ? ». Le jeu de données a déjà ses mesures de qualité. Les réutiliser plutôt que d'en inventer de nouvelles, c'est éviter deux vocabulaires et deux vérités qui finissent par se contredire. Cette décision a structuré le travail en cours. Elle laisse à préciser les attentes associées à chaque engagement : partager une mesure n'impose pas un seuil identique pour tous les consommateurs.

Dans les deux cas, j'ai anticipé la règle au lieu de la découvrir dans l'écran. C'est moins spectaculaire qu'une belle interface. Cela permet de discuter les décisions structurantes avant qu'elles ne se répercutent dans plusieurs interfaces.

## Une fois le modèle posé, la conception se répète

Le bénéfice le plus concret d'un modèle explicite, c'est qu'il rend la conception reproductible.

Chez Desoutter, chaque niveau de l'arbre suivait le même gabarit. Cette répétition visait à faciliter le repérage. À la fin de ma mission, l'équipe front construisait les nouvelles pages sans repasser par une conception écran par écran.

Le modèle guide la conception des écrans ; en retour, leur manipulation révèle ses ambiguïtés ou ses manques. Il fournit un langage commun pour que designers, responsables produit et ingénieurs discutent des mêmes objets.

## Un modèle n'est jamais fini

Poser le modèle tôt ne veut pas dire le figer. Un produit numérique évolue en permanence : une nouvelle fonctionnalité peut conduire à ajouter un objet, créer une relation ou faire évoluer une règle existante.

Un bon modèle n'est donc pas celui qui a tout prévu. C'est celui qui accueille ces changements sans tout remettre en cause : un nouvel objet trouve sa place à côté des autres, une nouvelle relation ne contredit pas les anciennes, et les conséquences pour les écrans existants restent identifiables. Certaines évolutions exigent toutefois de revoir le modèle et ses représentations.

L'inverse est un signal d'alerte. Si chaque nouvelle fonctionnalité oblige à créer un nouvel objet, sans pouvoir s'appuyer sur ce qui existe déjà, c'est peut-être que le modèle se fragmente : on crée de la redondance, deux objets qui disent presque la même chose, et une complexité que personne n'a choisie. Avant d'ajouter un objet, je vérifie si un objet existant peut porter ce besoin sans changer de sens. Réutiliser à tout prix serait une autre erreur : deux concepts distincts doivent pouvoir le rester.

C'est aussi pour ça que le design doit rester présent après le cadrage. Les fonctionnalités qui font évoluer les objets ou leurs règles demandent de reprendre cette discussion, puis d'en éprouver les effets dans les parcours.

## Les limites

Cette démarche a deux limites que je ne veux pas cacher.

La première : le modèle ne sort pas toujours en premier. Sur un sujet flou, il m'arrive de prototyper d'abord, en code, avec Claude ou Figma Make, pour faire émerger les objets en manipulant quelque chose. Le prototype n'est alors pas une solution, c'est un outil pour trouver le modèle.

La seconde : avoir le bon modèle ne suffit pas. Dans ma proposition sur les vues d'ensemble chez Qlik, la règle est simple, mais l'appliquer veut dire reprendre tous les types existants, un chantier lourd. Une architecture ne s'impose pas d'un coup. Le chemin d'adoption que je propose consiste à appliquer la règle progressivement, un type à la fois, avec des templates pour partager la structure. Un modèle juste mais impossible à adopter reste une bonne idée sur le papier.

## Ce qui reste

Concevoir le modèle avant l'écran, ce n'est pas retarder le design. C'est le placer là où il pèse : au moment où les règles se décident.

---

**Cas cités** : Desoutter (l'installation comme structure de navigation) · Data contracts (réutiliser les mesures existantes). **Note complémentaire** : Templates (un chemin d'adoption encore à éprouver).

**Écrits liés** : 03 · Un design system qui s'arrête au bouton · 05 · Plusieurs interfaces, un même produit.
