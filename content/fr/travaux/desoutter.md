---
# Cas de démonstration, repris de la maquette Figma (nœud 27:316).
# Les « À compléter » restent à fournir : ils font échouer le build de production.
numero: 1
slug: desoutter
statut: brouillon
titre: Une installation qu’on parcourt comme une arborescence
chapo: "Chez Desoutter, des contrôleurs Multi pilotent des dizaines d’outils de vissage, chacun avec ses programmes. J’ai conçu la version SaaS de leurs logiciels, WebUI, et créé son design system. Le cœur du travail : une navigation qui suit la structure de l’installation elle-même."
meta: Desoutter · Plateforme SaaS industrielle
strates:
  surfaces: false
  designSystem: true
  modele: true
entree:
  titre: Unifier des logiciels métiers en une plateforme
  description: Une architecture par profils sur un socle de données commun, tenue par un design system gouverné.
cartouche:
  role: Product designer, en indépendant
  duree: Un an, en sprints
  equipe: Deux Product Owners, trois développeurs front-end
  livrables: WebUI (SaaS), design system
trenteSecondes:
  probleme: "Un logiciel par tâche : le même outil, le même programme de vissage existaient dans plusieurs applications, avec des écrans et un vocabulaire différents."
  decision: "Organiser tout le produit comme l’installation elle-même : Multi, tightening units, programmes, avec la même page à chaque niveau."
  ceQuiReste: Quatre métiers qui parcourent le même arbre, et des états qui remontent d’un niveau à l’autre.
titreDecisions: Trois choix, et ce qu’ils ont coûté
decisions:
  - titre: Organiser le produit comme l’installation
    plutotQue: une navigation par fonctions (configurer, analyser, diagnostiquer).
    parceQue: les quatre métiers parcourent le même arbre et y cherchent autre chose.
    auPrixDe: à compléter.
  - titre: Un pset parcouru par paliers
    plutotQue: choisir entre un mode avancé et une configuration pas à pas.
    parceQue: deux personas sur trois demandaient les deux.
    auPrixDe: à compléter.
  - titre: Plusieurs chemins, un même nœud
    plutotQue: à compléter.
    parceQue: le technicien de maintenance n’est pas forcément devant la ligne quand l’opérateur l’appelle.
    auPrixDe: à compléter.
titreRegles: Trois règles du design system
regles:
  - Chaque niveau de l’arborescence suit le même gabarit.
  - Les états sont les mêmes partout et remontent d’un niveau à l’autre.
  - Les actions disponibles dépendent du profil et des droits.
reglesCommentaire: "À compléter : un composant concret dont les actions changeaient selon le profil, et ce qui changeait entre desktop et tablette d’atelier."
reglesEcrit: 4
ecritsLies: [3, 4]
casSuivant: 2
---

## Le système avant

### Un logiciel par tâche

Chaque tâche avait son logiciel : configurer un contrôleur, analyser des courbes de vissage, collecter les résultats, gérer les droits d’accès. Un même outil ou un même programme de vissage existait dans plusieurs applications, avec des écrans et parfois un vocabulaire différents.

Réunir ces logiciels dans un seul produit, c’était faire cohabiter quatre métiers qui n’y cherchent pas la même chose : l’opérateur, la maintenance, l’ingénieur process et l’ingénieur qualité.

![À compléter : schéma des logiciels avant WebUI](a-completer "Fig. 01 · Les logiciels avant WebUI, une tâche chacun")

## Le modèle

### Descendre dans l’installation

Plutôt que d’organiser WebUI par fonctions, j’ai conçu toute l’expérience comme une arborescence qui reproduit l’installation physique. On entre par les Multi ; chaque Multi donne accès à ses tightening units ; chaque tightening unit à ses programmes de vissage et à ses autres propriétés.

```figure
type: arborescence
legende: "Fig. 02 · L’arborescence de WebUI : quatre niveaux, une même page"
niveaux:
  - nom: Système
    description: Tous les Multi et leur état
  - nom: Multi
    description: Ses tightening units en temps réel
  - nom: Tightening unit
    description: Ses programmes et ses propriétés
  - nom: Programme (pset)
    description: Consulté, puis édité
bandeau: "Même page à chaque niveau : titre, onglets Overview · Settings · History, fil d’Ariane pour remonter"
```

L’état remonte dans l’arbre : une tightening unit hors tolérance apparaît dans le compteur de son Multi, qui apparaît dans la vue système. D’en haut, on voit où descendre.

::decisions

## Matérialisation

### Le modèle à l’écran

![À compléter : capture de la vue système](a-completer "Vue système : tous les Multi et leur état")

![À compléter : capture d’un Multi](a-completer "Un Multi : ses tightening units en temps réel")

![À compléter : capture d’une tightening unit](a-completer "Une tightening unit : ses programmes de vissage, édités en panneau latéral")

## Résultats et limites

### Ce qui a changé

À compléter : résultat observé (logiciels remplacés, adoption, délai de livraison), et ce que la confidentialité permet de montrer des écrans.

:::lead
Ce qui reste de ce projet : une navigation calquée sur la structure de ce qu’on pilote, la même page à chaque niveau, et des métiers qui partagent le même arbre.
:::
