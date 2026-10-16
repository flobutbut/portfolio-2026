---
# Demo case study, taken from the Figma mockup (node 27:316). English translation by Claude.
# "À compléter" placeholders remain to be supplied: they fail the production build.
numero: 1
slug: desoutter
statut: brouillon
titre: An installation you navigate like a tree
chapo: "At Desoutter, Multi controllers drive dozens of tightening tools, each with its own programs. I designed the SaaS version of their software, WebUI, and created its design system. The heart of the work: a navigation that follows the structure of the installation itself."
meta: Desoutter · Industrial SaaS platform
strates:
  surfaces: false
  designSystem: true
  modele: true
entree:
  titre: Unifying business software into one platform
  description: A profile-based architecture on a shared data foundation, held together by a governed design system.
cartouche:
  role: Product designer, freelance
  duree: One year, in sprints
  equipe: Two Product Owners, three front-end developers
  livrables: WebUI (SaaS), design system
trenteSecondes:
  probleme: "One piece of software per task: the same tool, the same tightening program existed in several applications, with different screens and vocabulary."
  decision: "Organise the whole product like the installation itself: Multi, tightening units, programs, with the same page at every level."
  ceQuiReste: Four professions navigating the same tree, and states that roll up from one level to the next.
titreDecisions: Three choices, and what they cost
decisions:
  - titre: Organise the product like the installation
    plutotQue: a navigation by function (configure, analyse, diagnose).
    parceQue: the four professions navigate the same tree and look for different things in it.
    auPrixDe: à compléter.
  - titre: A pset explored in stages
    plutotQue: choosing between an advanced mode and a step-by-step setup.
    parceQue: two personas out of three asked for both.
    auPrixDe: à compléter.
  - titre: Several paths, one node
    plutotQue: à compléter.
    parceQue: the maintenance technician is not necessarily at the line when the operator calls.
    auPrixDe: à compléter.
titreRegles: Three design system rules
regles:
  - Every level of the tree follows the same template.
  - States are the same everywhere and roll up from one level to the next.
  - Available actions depend on the profile and permissions.
reglesCommentaire: "À compléter : un composant concret dont les actions changeaient selon le profil, et ce qui changeait entre desktop et tablette d’atelier."
reglesEcrit: 4
ecritsLies: [3, 4]
casSuivant: 2
---

## The system before

### One piece of software per task

Each task had its own software: configuring a controller, analysing tightening curves, collecting results, managing access rights. The same tool or the same tightening program existed in several applications, with different screens and sometimes different vocabulary.

Bringing this software together into a single product meant having four professions coexist, each looking for something different: the operator, maintenance, the process engineer and the quality engineer.

![À compléter : schéma des logiciels avant WebUI](a-completer "Fig. 01 · Software before WebUI, one task each")

## The model

### Going down into the installation

Rather than organising WebUI by function, I designed the whole experience as a tree that mirrors the physical installation. You enter through the Multi; each Multi gives access to its tightening units; each tightening unit to its tightening programs and its other properties.

```figure
type: arborescence
legende: "Fig. 02 · The WebUI tree: four levels, one page"
niveaux:
  - nom: System
    description: All the Multi and their state
  - nom: Multi
    description: Its tightening units in real time
  - nom: Tightening unit
    description: Its programs and properties
  - nom: Program (pset)
    description: Viewed, then edited
bandeau: "Same page at every level: title, Overview · Settings · History tabs, breadcrumb to go back up"
```

State rolls up the tree: a tightening unit out of tolerance shows up in its Multi’s counter, which shows up in the system view. From the top, you can see where to go down.

::decisions

## Materialisation

### The model on screen

![À compléter : capture de la vue système](a-completer "System view: all the Multi and their state")

![À compléter : capture d’un Multi](a-completer "A Multi: its tightening units in real time")

![À compléter : capture d’une tightening unit](a-completer "A tightening unit: its tightening programs, edited in a side panel")

## Results and limits

### What changed

À compléter : résultat observé (logiciels remplacés, adoption, délai de livraison), et ce que la confidentialité permet de montrer des écrans.

:::lead
What remains of this project: a navigation modelled on the structure of what you operate, the same page at every level, and professions that share the same tree.
:::
