---
# Modèle d'écrit : copiez ce fichier dans content/fr/ecrits/<slug>.md
# (et sa traduction dans content/en/writing/<slug>.md, même numero).
numero: 8                      # identifiant partagé entre les langues
slug: mon-ecrit                # adresse : /ecrits/mon-ecrit
statut: brouillon              # brouillon | publie
titre: "À compléter : titre"
these: "À compléter : la thèse en une phrase."
genre: Prise de position       # facultatif, affiché dans le surtitre
strates:
  surfaces: false
  designSystem: false
  modele: true
tempsLecture: 5                # en minutes
# date: 2026-11-02             # facultatif (AAAA-MM-JJ)
casCites: []                   # numéros de cas, ex. [1]
ecritsLies: []                 # numéros d'écrits, ex. [5, 6]
limites: |
  À compléter : ce que cet écrit ne prétend pas.
---

À compléter : premier paragraphe, affiché en chapô.

À compléter : paragraphes suivants.

## Intertitre

> Une citation mise en avant, avec le filet bleu.

```figure
type: strates
legende: Fig. 01 · Légende
strates:
  - nom: Surfaces
    elements: web · mobile · API
    note: Une note courte
  - nom: Modèle
    elements: objets · états · droits
    note: Une note courte
    actif: true
```

:::question
À compléter : la question finale, en bleu.
:::
