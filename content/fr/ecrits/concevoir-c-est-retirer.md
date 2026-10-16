---
# Repris de docs/Portfolio/03a_Ecrit_01_Concevoir_c_est_retirer.md.
numero: 1
slug: concevoir-c-est-retirer
statut: publie
titre: "Concevoir, c’est retirer"
these: "Un système bien conçu réduit l'effort nécessaire pour passer d'un besoin à une action, sans enlever les repères utiles."
strates:
  surfaces: false
  designSystem: false
  modele: true
tempsLecture: 4
casCites: [4]
ecritsLies: [2, 3, 4, 5]
---

> Concevoir, ce n'est pas ajouter du soin visible à un produit fonctionnel : c'est retirer, un par un, tous les éléments qui n'existent que parce que personne n'a pris la peine de les remettre en question. Un système bien conçu absorbe l'écart entre ce qu'on lui donne et ce dont on a besoin, en limitant l'effort demandé à celui qu'il sert. Il évite de solliciter inutilement l'attention, tout en laissant accessibles les repères nécessaires pour comprendre et agir.

Ce texte est le point de départ des quatre autres. Il dit ce que je cherche quand je conçois, et pourquoi cela se voit si peu.

## Le soin visible n'est pas le soin

Il est tentant de mesurer un travail de design à ce qu'il ajoute : une animation, une illustration, un écran de plus pour expliquer. Ce soin-là se voit, il se montre bien en revue.

Dans les produits construits par ajouts successifs, certains éléments restent présents parce qu'ils étaient là avant ou qu'une donnée était disponible. Leur utilité n'est plus interrogée. Le travail le plus utile consiste souvent à poser cette question, élément par élément.

Chez Qlik, la vue d'ensemble d'un jeu de données affichait son schéma complet, parfois des centaines de colonnes. J'ai proposé de réserver le schéma exhaustif à une vue dédiée. La vue d'ensemble pourrait alors aider à identifier le jeu de données, comprendre son utilité et accéder aux actions pertinentes. C'est une proposition de répartition de l'information, dont l'adoption est en cours de travail.

## Absorber l'écart

Entre ce qu'un utilisateur donne au système et ce dont il a besoin, il y a presque toujours un écart. Soit le système le prend en charge, soit il le laisse à l'utilisateur.

Prenons un exemple simple : réserver une salle de réunion. L'utilisateur sait ce qu'il veut : une salle pour six personnes, mardi après-midi, près de son équipe. Un système qui ne fait que lister les salles lui laisse tout le travail : vérifier les capacités, comparer les créneaux, chercher où elles se trouvent. Un système qui absorbe l'écart part de son besoin et lui propose les deux ou trois salles qui conviennent.

Dans cet exemple, retirer consiste à réduire le travail de comparaison, pas seulement le nombre d'éléments affichés. La sélection doit rester compréhensible et permettre d'explorer les autres salles si les critères proposés ne conviennent pas.

## S'effacer, puis reparaître au bon moment

Retirer ne veut pas dire supprimer. Le schéma d'un jeu de données reste indispensable : la proposition consiste à le déplacer dans une vue dédiée, accessible depuis la vue d'ensemble. Le déplacement n'est utile que si le lecteur sait où retrouver le détail.

C'est la même logique pour les états, les erreurs, les confirmations. Un système bien conçu ne commente pas tout ce qu'il fait. Il rend son état accessible sans réclamer inutilement l'attention, et signale ce qui demande une décision ou une confirmation. Dans une activité de surveillance, un état normal peut lui-même être une information essentielle.

## Ce qu'on ne laisse pas apparaître

Ce travail a un défaut : il se voit mal. Personne ne remarque la colonne qui n'est pas là, ni la question qu'on n'a pas eu à se poser. Le meilleur résultat d'un travail de conception est souvent quelque chose que l'utilisateur n'a jamais eu à porter.

C'est pour ça que les écrits qui suivent parlent surtout de ce qui se trouve sous les écrans : le modèle (02), les patterns métier (03), ce qu'une personne peut déléguer à un agent (04), et ce qui doit rester commun à plusieurs interfaces (05).

## Les limites

Retirer peut aller trop loin. Un élément qui semblait superflu servait parfois un usage rare mais réel, et le retirer revient alors à faire porter l'écart à quelqu'un d'autre. Retirer demande donc de savoir pour qui l'on retire, et ce qu'on lui enlève vraiment.

## Ce qui reste

Retirer est utile quand cela réduit l'effort sans enlever les repères nécessaires pour comprendre et agir. La question est donc autant ce qu'on simplifie que ce qu'on doit laisser visible.
