---
# English translation by Claude of content/fr/travaux/templates-types-assets.md. The planned figure remains to be supplied.
numero: 4
slug: asset-type-templates
statut: brouillon
nature: note
titre: "Giving each view a role"
chapo: "At Qlik, each type of resource — dataset, data product or pipeline project — had its own overview, built as needs arose. I am working to base them on shared page templates, giving each view a precise role."
meta: "Qlik · Unified Talend and Qlik experience"
strates:
  surfaces: true
  designSystem: true
  modele: false
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

## The approach: one role per view

Rather than fixing each page, I proposed revisiting the architecture of resources from a simple rule: each view has a role.

- **The overview makes it possible to identify the resource, understand what it is for and reach the relevant actions.**
- **Raw and exhaustive content lives in dedicated views**: for a dataset, profile, schema and data preview views; for a data product, a filterable list of resources.

I propose writing this rule into the design system of the unified experience as shared page templates. Applying them must take into account the information needed to evaluate each resource type.

![Planned figure](a-completer "an existing overview, then the proposed structure — identification, information useful for evaluation, actions and access to detailed views")

## Getting an architecture adopted

A rule like this cannot be imposed all at once. The obstacle is simple: applying it means reworking every resource type, a heavy undertaking. I propose two ways to make it manageable: apply the model progressively, one resource type at a time, as each evolves; and go through templates, so that each type adopts the shared structure without being redesigned from scratch.

## State of the work and limits

This note describes a proposal in progress, not an architecture whose adoption is complete. Progressive rework and templates are the envisaged adoption path. Their effectiveness and the exceptions to the model remain to be documented.

A dedicated view must not make information hard to find either: lightening the overview is only worthwhile if access to the details stays clear.
