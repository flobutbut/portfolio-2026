---
# English translation by Claude of content/fr/travaux/templates-types-assets.md. The planned figure only shows in previews until supplied.
numero: 4
slug: asset-type-templates
statut: publie
nature: note
titre: "Giving each view a role"
chapo: "At Qlik, each type of resource (dataset, data product or pipeline project) had its own overview, built as needs arose. I am working to base them on shared page templates, giving each view a precise role."
meta: "Qlik · Unified Talend and Qlik experience"
strates:
  surfaces: true
  designSystem: true
  modele: false
visuel:
  src: /images/templates-types-assets/apercu.svg
  alt: "Isometric illustration: stacked views, built on a shared page template"
cartouche:
  role: "Senior Product Designer"
  duree: "In progress"
  equipe: "Design system team, Head of Design"
  livrables: "Architecture proposal, page templates"
ecritsLies: [1, 3]
casSuivant: 1
---

I work on it with Qlik’s design system team and Head of Design, as part of the unified experience across the Talend and Qlik products.

## Before: an overloaded overview

From one resource type to the next, no overview shared the same structure. Each accumulated whatever people wanted to show, with no common rule on how information should be distributed across views.

Two examples are enough. The overview of a data product displays the full list of its datasets; that of a dataset displays its entire schema. With five hundred columns or a long list, the view loses its purpose: to identify the resource and understand whether it meets the need before exploring its details.

```figure
type: schema
legende: "Fig. 01 · Before: a data product’s overview stacks all its datasets; a dataset’s, its entire schema."
blocs:
  - colonnes:
      - intitule: "Before"
        blocs:
          - page:
              surtitre: "Data product"
              titre: "Overview"
              blocs:
                - { bloc: "Summary", ton: clair }
                - { bloc: "Full list of datasets", ton: clair, lignes: 7, suite: "… and everything else, endlessly" }
      - intitule: "Before"
        blocs:
          - page:
              surtitre: "Dataset"
              titre: "Overview"
              blocs:
                - { bloc: "Summary", ton: clair }
                - { bloc: "Full schema · 500 columns", ton: clair, lignes: 7, suite: "… and everything else, endlessly" }
```

## The approach: one role per view

Rather than fixing each page, I proposed revisiting the architecture of resources from a simple rule: each view has a role.

- **The overview makes it possible to identify the resource, understand what it is for and reach the relevant actions.**
- **Raw and exhaustive content lives in dedicated views**: for a dataset, profile, schema and data preview views; for a data product, a filterable list of resources.

I propose writing this rule into the design system of the unified experience as shared page templates. Applying them must take into account the information needed to evaluate each resource type.

```figure
type: schema
legende: "Fig. 02 · After: the overview summarises, shows the value and invites action; the details live in dedicated views, one click away."
blocs:
  - chaine:
      - intitule: "After"
        groupe:
          - page:
              surtitre: "Dataset or data product"
              titre: "Overview"
              blocs:
                - { bloc: "Summarise" }
                - { bloc: "Show the value" }
                - { bloc: "Invite action", ton: bleu }
      - { liaison: "see the details" }
      - groupe:
          - objets:
              - { objet: "Profile, schema, preview", description: "dataset · the five hundred columns, in their place" }
              - { objet: "Filterable resources", description: "data product · the full list, filterable by dataset" }
```

## Getting an architecture adopted

A rule like this cannot be imposed all at once. The obstacle is simple: applying it means reworking every resource type, a heavy undertaking. I propose two ways to make it manageable: apply the model progressively, one resource type at a time, as each evolves; and go through templates, so that each type adopts the shared structure without being redesigned from scratch.

## State of the work and limits

This note describes a proposal in progress, not an architecture whose adoption is complete. Progressive rework and templates are the envisaged adoption path. Their effectiveness and the exceptions to the model remain to be documented.

A dedicated view must not make information hard to find either: lightening the overview is only worthwhile if access to the details stays clear.
