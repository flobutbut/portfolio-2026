---
# Rédigé à partir du récit de Florian et du cas de Jérôme :
# https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2
# Les mesures citées viennent du prototype de Jérôme.
numero: 5
slug: plans-d-etage
statut: publie
titre: "Ne plus retracer ce qu’on vient de dessiner"
chapo: "Chez Witco, on réserve un bureau ou une salle depuis le plan de son étage. Chaque bureau était dessiné dans Figma, puis retracé à la main sur la plateforme. J’ai conçu un fond de carte qui garde cette information à l’export : un plan lisible par les humains, et indexable par la machine."
meta: "Witco · Réservation d’espaces sur plan"
strates:
  surfaces: true
  designSystem: true
  modele: true
entree:
  titre: "Un plan d’étage qui s’indexe en se dessinant"
  description: "Un design system de fond de carte qui porte la structure des espaces, et deux exports pour deux lecteurs : l’humain et la machine."
visuel:
  src: /images/plans-d-etage/apercu.svg
  alt: "Illustration isométrique : un plan d’étage avec ses salles et ses bureaux, et au-dessus, dans le même cadre, le calque d’index où chaque espace est une forme bleue"
cartouche:
  role: "Principal Product Designer"
  duree: "Trois mois, en parallèle d’autres sujets"
  equipe: "Seul sur la logique et le fond de carte ; avec Jérôme sur l’outil d’étiquetage"
  livrables: "Logique métier et parcours, design system et méthode de fonds de carte, outil d’étiquetage (avec Jérôme)"
ecritsLies: [1, 3]
casSuivant: 1
---

Le problème se présentait comme un problème d’outil : retracer les espaces sur la plateforme prenait trop de temps. En remontant la chaîne, il est apparu ailleurs. L’information qu’on retraçait avait déjà été produite, puis perdue en route.

## Avant : retracer ce qu’on venait de dessiner

Un designer redessinait dans Figma le plan fourni par le client, en posant chaque bureau, puis l’exportait en image. Les équipes Customer Success importaient cette image dans la plateforme et y retraçaient chaque salle et chaque bureau, à la main.

![Plan d’architecte fourni par un client, annoté à la main : noms des salles reliés par des traits, zones des services entourées en bleu](/images/plans-d-etage/plan-client.webp "Fig. 01 · Le point de départ : le plan fourni par le client")

![Outil de création de la plateforme : six salles de réunion retracées à la main en rouge par-dessus l’image du plan, la liste des ressources à droite](/images/plans-d-etage/trace-manuel.webp "Fig. 02 · Chaque salle retracée à la main par-dessus l’image (capture : Jérôme)")

Le designer savait où était chaque bureau ; l’export en image effaçait cette connaissance, et quelqu’un la reconstruisait à l’œil. Toutes les difficultés venaient de là :

| Symptôme | Ce qu’il révèle |
| --- | --- |
| Environ deux jours de tracé pour 1 800 espaces | L’emplacement de chaque espace est ressaisi. |
| Des formes mal alignées sur le dessin | On retrace une image à l’œil. |
| Une netteté qui dépend de l’écran | Le plan n’existe qu’en pixels. |
| Des noms ressaisis à la main | Le plan ignore les espaces qu’il montre, alors que la plateforme les connaît. |

Accélérer le tracé aurait soulagé ces symptômes. J’ai préféré supprimer la perte, et avec elle l’étape qui la compensait.

## Un composant qui sait ce qu’il est

Dans le design system des fonds de carte, chaque composant porte deux choses : son apparence et une couche dédiée à l’export. Un bureau contient un calque « desk » ; une salle de réunion, un bureau fermé ou une zone contiennent le leur. Le designer ne fait rien de plus que dessiner : l’index se construit pendant le dessin.

![Détail d’un fond de carte en style Aquarell : postes de travail, salles de réunion, cabines téléphoniques et sanitaires repérés par des icônes, escalier, plantes](/images/plans-d-etage/detail.webp "Fig. 03 · Chaque bureau, chaque salle, chaque cabine est un composant qui porte son index")

Le style s’inspire des plans d’architecte présentés en avant-vente : ce plan sert à choisir où travailler, il doit donner envie de venir. Textures, végétation et icônes d’espaces suivent des règles d’usage, pour que deux designers produisent le même plan. Comme l’index tient aux composants et non à leur apparence, j’ai pu explorer plusieurs styles sans toucher à l’indexation.

![Le même plan découpé en cinq bandes verticales, chacune dans un style : Origin, Carbon, Aquarell, Modernist Dark, Modernist Light](/images/plans-d-etage/styles.webp "Fig. 04 · Le même plan, cinq styles : Origin, Carbon, Aquarell, Modernist Dark, Modernist Light")

## Un plan, deux lecteurs

L’humain a besoin d’ambiance et de repères ; la machine, de formes nommées et de rien d’autre. À l’export, on produit donc deux fichiers de la même taille : le PNG garde tout le dessin, le SVG ne garde que les cadres à indexer. Superposés, chaque forme du SVG tombe exactement sur ce qu’elle désigne.

```figure
type: strates
legende: "Fig. 05 · Deux exports superposés, à la même taille"
strates:
  - nom: SVG
    elements: desk · zones · espaces
    note: Pour la machine
    actif: true
  - nom: PNG
    elements: cloisons · mobilier · textures · icônes
    note: Pour l’humain
```

Il ne reste qu’à relier chaque forme à l’espace correspondant sur la plateforme. L’outil d’étiquetage est né de cette idée : nous l’avons conçu ensemble, Jérôme et moi, et il l’a prototypé avec Figma Make après mon départ. À terme, le même index doit aussi permettre à l’utilisateur final de choisir son siège sur le plan.

![Prototype d’étiquetage : salles assignées en vert avec leur nom, le curseur affiche « Desk 5 », mode éclair activé dans le panneau, mini-carte en bas à droite](/images/plans-d-etage/mode-eclair.webp "Fig. 06 · L’outil d’étiquetage : chaque forme est reliée à un espace, puis l’outil propose le suivant (prototype et capture : Jérôme)")

## Lever les risques avant qu’ils coûtent

Le risque ne se trouvait ni dans Figma ni dans la plateforme, mais à la jonction : un SVG produit d’un côté serait-il exploitable de l’autre ? Je l’ai testé en premier, sur de petits plans, avec des prototypes jetables codés avec l’IA : un pour la création, un pour l’exploitation. Le concept a tenu dès ces essais.

Restait l’adoption. Personne ne lit les tutoriels : j’ai fait tester la création à des collègues avec un seul plan d’exemple découpé en calques, sans explication. Ils ont pris la main très vite ; la structure du fichier suffisait à enseigner la méthode.

## Résultats et limites

Sur le prototype de Jérôme, l’étiquetage d’un petit plan est passé de 3 min 47 s à 20 s. Pour un bâtiment de 1 800 espaces, l’estimation passe de deux jours à deux heures. Et les noms venant de la plateforme, les designers n’ont plus à les dessiner.

Ce sont des chiffres de prototype, pas de production. Le principe a aussi un coût : une couche d’export à maintenir dans chaque composant, deux fichiers à garder synchrones, et une discipline, puisqu’un plan dessiné sans les composants ne produit aucun index.

À mon départ, la méthode, le design system et l’outil étaient conçus et validés. Le cas de Jérôme montre la suite côté outil : [Witco : AI Proof of Concept](https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2).

:::lead
On ne gagne pas du temps en traçant plus vite, mais en n’ayant plus rien à retracer.
:::
