---
# Rédigé à partir du récit de Florian et du cas de Jérôme :
# https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2
# Les mesures citées viennent du prototype de Jérôme.
numero: 5
slug: plans-d-etage
statut: publie
titre: "Ne plus retracer ce qu’on vient de dessiner"
chapo: "Chez Witco, on réserve un bureau ou une salle depuis le plan de son étage. Pour y arriver, un designer dessinait chaque bureau dans Figma, puis quelqu’un le retraçait à la main sur la plateforme. Plutôt que d’accélérer ce second tracé, j’ai conçu un fond de carte qui ne perd plus l’information à l’export : un plan lisible par les humains, et indexable par la machine."
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
trenteSecondes:
  probleme: "Chaque espace d’un plan était dessiné dans Figma, exporté en image, puis retracé à la main sur la plateforme : environ deux jours pour un bâtiment de 1 800 espaces. On reconstruisait une information qui existait déjà au moment du dessin."
  decision: "Ne plus perdre cette information. Chaque composant du fond de carte porte sa couche d’index ; elle est exportée dans un SVG aligné au pixel sur l’image."
  ceQuiReste: "Un principe arrêté avant mon départ et repris tel quel pour le prototype : le fond de carte porte son propre index, l’outil n’a plus qu’à le relier à la plateforme."
titreDecisions: "Supprimer la perte plutôt que la compenser"
decisions:
  - titre: "Garder l’information au lieu de la reconstruire"
    plutotQue: "accélérer le tracé des espaces dans l’outil de la plateforme"
    parceQue: "le designer sait où est chaque bureau au moment où il le pose ; c’est l’export en image qui effaçait cette connaissance"
    auPrixDe: "une couche d’export à maintenir dans chaque composant"
  - titre: "Deux lecteurs, deux fichiers, un même cadre"
    plutotQue: "un fichier unique qui serve à la fois d’image et d’index"
    parceQue: "l’humain a besoin d’ambiance et de repères, la machine de formes nommées et de rien d’autre ; à la même taille, les deux se superposent sans calage"
    auPrixDe: "deux exports par plan, qui doivent rester synchrones"
  - titre: "La structure enseigne la méthode"
    plutotQue: "une documentation à lire avant de commencer"
    parceQue: "personne ne lit les tutoriels ; un plan d’exemple découpé en calques se comprend en l’ouvrant"
    auPrixDe: "un fichier d’exemple à tenir à jour avec le design system"
titreRegles: "Ce que le fond de carte garantit"
regles:
  - "Poser un composant, c’est l’indexer : personne n’a d’étape d’indexation à se rappeler."
  - "Chaque lecteur reçoit ce dont il a besoin, et rien d’autre : l’image pour l’humain, les formes nommées pour la machine."
  - "Une personne qui ouvre le fichier doit pouvoir créer un plan sans lire la documentation."
ecritsLies: [1, 3]
casSuivant: 1
---

Le problème se présentait comme un problème d’outil : le tracé des espaces sur la plateforme était trop lent. En remontant la chaîne, il est apparu ailleurs. L’information qu’on retraçait avait déjà été produite, puis perdue en route.

![Plan d’étage dans la plateforme Witco : salles de réunion libres en vert, une salle occupée en rouge, une fiche « Meeting room 4 » avec un bouton de réservation](/images/plans-d-etage/reservation.webp "Fig. 01 · Côté utilisateur : réserver une salle depuis le plan (capture : Jérôme)")

## Avant : retracer ce qu’on venait de dessiner

Pour qu’un client puisse réserver depuis un plan, quatre étapes s’enchaînaient :

| Étape | Qui | Ce qui est fait |
| --- | --- | --- |
| 1 | Customer Success | Créer toutes les salles et tous les bureaux sur la plateforme. |
| 2 | Designers | Redessiner le plan dans Figma, en posant chaque bureau, puis l’exporter en PNG. |
| 3 | Customer Success | Importer l’image dans l’outil de création de la plateforme. |
| 4 | Customer Success | Retracer chaque salle et chaque bureau par-dessus l’image. |

![Plan d’architecte fourni par un client, annoté à la main : noms des salles reliés par des traits, zones des services entourées en bleu](/images/plans-d-etage/plan-client.webp "Fig. 02 · Le point de départ : le plan fourni par le client, annoté de ses noms de salles")

À l’étape 2, le designer place chaque bureau : il sait exactement où il se trouve. À l’étape 4, quelqu’un d’autre le retrace à l’œil. Entre les deux, l’export en image a tout aplati : le plan ne savait plus ce qu’il représentait.

![Outil de création de la plateforme : six salles de réunion retracées à la main en rouge par-dessus l’image du plan, la liste des ressources à droite](/images/plans-d-etage/trace-manuel.webp "Fig. 03 · L’étape 4 : chaque salle retracée à la main par-dessus l’image (capture : Jérôme)")

Les difficultés qu’on rencontrait à l’étape 4 venaient toutes de cette perte :

| Symptôme | Ce qu’il révèle |
| --- | --- |
| Environ deux jours de tracé pour 1 800 espaces | L’emplacement de chaque espace est ressaisi. |
| Des formes mal alignées sur le dessin | On retrace une image à l’œil. |
| Une netteté qui dépend de l’écran | Le plan n’existe qu’en pixels. |
| Des noms ressaisis à la main | Le plan ignore les espaces qu’il montre, alors que la plateforme les connaît. |

Accélérer le tracé aurait soulagé ces symptômes. J’ai préféré supprimer la perte, et avec elle l’étape qui la compensait.

## Un composant qui sait ce qu’il est

### Poser un bureau, c’est l’indexer

Dans le design system des fonds de carte, chaque composant porte deux choses : son apparence et une couche dédiée à l’export. Un bureau contient un calque « desk » ; une salle de réunion, un bureau fermé ou une zone contiennent le leur. Le designer ne fait rien de plus que dessiner. L’index se construit pendant le dessin.

C’est un design system qui ne s’arrête pas à l’apparence. Il décrit aussi ce que chaque élément est, et cette description voyage avec lui jusqu’à la plateforme.

![Détail d’un fond de carte : postes de travail, salles de réunion, cabines téléphoniques et sanitaires repérés par des icônes, escalier, plantes](/images/plans-d-etage/detail.webp "Fig. 04 · Chaque bureau, chaque salle, chaque cabine est un composant qui porte son index")

La méthode suit le même principe : chaque geste correspond à un groupe de calques. La structure du fichier montre l’ordre de fabrication.

```figure
type: parcours
legende: "Fig. 05 · La méthode : chaque étape est un groupe de calques"
etapes:
  - { nom: "Placer le plan", description: "Le document du client sert de calque." }
  - { nom: "Décalquer les cloisons", description: "Les murs et les pièces sont redessinés." }
  - { nom: "Positionner le mobilier", description: "Chaque composant apporte son index." }
  - { nom: "Ajouter les assets", description: "Textures, plantes, icônes des espaces." }
```

### Un plan qu’on a envie d’habiter

Pour le style graphique, je suis parti des plans d’architecte présentés en avant-vente plutôt que des plans techniques. Ce plan sert à choisir où travailler. Il doit donner envie de venir, pas seulement inventorier des postes. D’où les textures, les plantes pour amener de la vie, et un système d’icônes qui désigne les espaces sans légende. Des règles d’usage encadrent chaque composant et chaque texture, pour que deux designers produisent le même plan.

![Plan rapproché en style Aquarell : sol beige grainé, sanitaires en marbre, cabines en terrazzo, verrière, jardin et arbres peints à l’aquarelle, mobilier et icônes des espaces](/images/plans-d-etage/plan.webp "Fig. 06 · Le style Aquarell de près : sols texturés, marbre, terrazzo et jardin à l’aquarelle")

J’ai exploré plusieurs styles sur ce même plan. D’un style à l’autre, seuls les fonds, les cloisons et la végétation changent d’aspect : la disposition reste identique. L’index étant porté par les composants, et non par leur apparence, changer de style ne touche pas à l’indexation.

![Le même plan découpé en cinq bandes verticales, chacune dans un style : Origin, Carbon, Aquarell, Modernist Dark, Modernist Light](/images/plans-d-etage/styles.webp "Fig. 07 · Le même plan, cinq styles : Origin, Carbon, Aquarell, Modernist Dark, Modernist Light")

## Un plan, deux lecteurs

### Ce qu’on voit et ce qu’on indexe

Le même plan a deux lecteurs qui n’attendent pas la même chose. L’humain a besoin d’ambiance et de repères. La machine a besoin de formes nommées, et de rien d’autre.

À l’export, on produit donc deux fichiers de la même taille. Le PNG contient tout le dessin. Le SVG ne garde que les cadres à indexer. Comme ils partagent le même cadre, ils se superposent sans réglage : chaque forme du SVG tombe exactement sur le dessin qu’elle désigne. Les deux fichiers forment un contrat simple entre celui qui dessine et l’outil qui exploite.

```figure
type: strates
legende: "Fig. 08 · Deux exports superposés, à la même taille"
strates:
  - nom: SVG
    elements: desk · zones · espaces
    note: Pour la machine
    actif: true
  - nom: PNG
    elements: cloisons · mobilier · textures · icônes
    note: Pour l’humain
```

L’index ne sert pas qu’à l’étiquetage. Les mêmes formes doivent, à terme, permettre à l’utilisateur final de choisir son siège directement sur le plan. Une fois la structure présente dans le dessin, chaque nouvel usage en profite sans retoucher les plans existants.

::decisions

## Ce qui reste à faire quand le plan sait tout

### Relier une forme à un nom

Avec un SVG déjà découpé, l’étiquetage ne demande plus de tracer : il suffit de relier chaque forme à l’espace correspondant sur la plateforme. L’outil est né de cette idée et nous l’avons conçu ensemble, Jérôme et moi. Tout était arrêté avant mon départ ; Jérôme a ensuite repris le projet pour le prototyper avec Figma Make.

Le travail qui reste n’est plus du dessin, c’est de l’attention. L’outil la ménage :

- **Mode éclair** : la plupart des clients nomment leurs espaces dans l’ordre du plan (M102, M103…). Une fois un espace assigné, l’outil propose le suivant.
- **Étiquette sous le curseur** : le nom en cours d’assignation suit le pointeur, pour que le regard reste sur le plan.
- **Noms dynamiques** : les étiquettes viennent de la plateforme et se mettent à jour si un nom change. Les designers n’ont plus à les dessiner.
- **Mini-carte** : sur un grand plan, elle montre où l’on se trouve.

![Prototype d’étiquetage : salles assignées en vert avec leur nom, le curseur affiche « Desk 5 », mode éclair activé dans le panneau, mini-carte en bas à droite](/images/plans-d-etage/mode-eclair.webp "Fig. 09 · Mode éclair : l’outil propose le bureau suivant, son nom suit le curseur (prototype et capture : Jérôme)")

## Lever les risques avant qu’ils coûtent

Le risque ne se trouvait ni dans Figma ni dans la plateforme, mais à la jonction : un SVG produit d’un côté serait-il exploitable de l’autre ? J’ai testé cette jonction en premier, sur de petits plans, avec des prototypes jetables codés avec l’IA de l’époque : un pour la création, un pour l’exploitation. Le concept a tenu dès ces essais.

Le second risque était l’adoption de la méthode. Une méthode qu’il faut apprendre dans un tutoriel finit par être mal appliquée. J’ai donc fait tester la création à des collègues avec un plan d’exemple découpé en calques, sans explication. Ils ont pris la main très vite : la structure suffisait.

Le projet n’a pas connu de crise. Je ne l’attribue pas à la chance : les deux risques ont été levés tôt, à petite échelle, avant qu’un plan réel en dépende.

## Résultats et limites

### Deux jours ramenés à deux heures, sur un prototype

Les mesures viennent du prototype réalisé par Jérôme après mon départ. Sur un petit plan d’exemple, l’étiquetage est passé de 3 min 47 s à 20 s. Pour un bâtiment de six étages et 1 800 espaces, l’estimation passe de deux jours à deux heures. Les étiquettes étant générées, Jérôme estime que les designers gagnent 20 % du temps de création d’un plan.

Ces chiffres sont issus d’un prototype, pas d’un outil en production. Le gain repose aussi sur une discipline : un plan dessiné sans les composants ne produit aucun index. Le mode éclair, lui, suppose des noms qui suivent l’ordre du plan, ce qui est fréquent mais pas universel.

À mon départ, la méthode, le design system et l’outil étaient conçus et validés. Le prototype et ce qui a suivi reviennent à Jérôme et à l’équipe en place.

Le cas de Jérôme, côté outil : [Witco : AI Proof of Concept](https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2).

:::lead
On ne gagne pas du temps en traçant plus vite, mais en n’ayant plus rien à retracer.
:::
