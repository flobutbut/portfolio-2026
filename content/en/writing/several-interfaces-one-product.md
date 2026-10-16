---
# English translation by Claude of content/fr/ecrits/plusieurs-interfaces-un-meme-produit.md.
numero: 5
slug: several-interfaces-one-product
statut: publie
titre: "Several interfaces, one product"
these: "When a product can be reached through several interfaces, its consistency depends on the objects, states and rules they share, as much as on the quality of each interface."
strates:
  surfaces: true
  designSystem: false
  modele: true
tempsLecture: 4
casCites: [2, 3]
ecritsLies: [2, 4]
---

You can book a room from a web application, a phone or a calendar invitation. The gestures and the visible information change. Yet the booking must keep the same meaning: which space, for whom, at what time and with what editing rights.

This question predates the arrival of agents. Their ability to act through different access points makes it more pressing: how do you allow several ways of using a product without multiplying versions of its rules?

## An interface exposes part of the product

At SharingCloud, WorkplaceToBe existed on the web, on mobile, in Outlook and on devices placed in the workspaces. These interfaces did not all offer the same features. An Outlook invitation and a display in front of a room made it possible to approach booking in different situations.

The work consisted in keeping the meaning of objects and uses while adapting their representation. The data model already existed on the back end; my role covered the objects handled in the interface and the consistency of their variations.

Sharing a product therefore does not mean reproducing the same screen everywhere. It requires deciding what must stay shared and what the context justifies changing.

## What must stay shared

I distinguish three complementary elements:

- **The product model**: its objects, their relations, their states and the rules that govern actions.
- **The access points**: graphical interfaces, command line or API, each exposing part of the product’s possibilities.
- **The design landmarks**: components, patterns and content rules that help teams build consistent experiences.

An agent is an actor that uses these accesses, not an interface of the same order as an API. And the design system does not by itself enforce business rules: permissions, checks and the handling of concurrent changes must be ensured by the system.

These decisions require joint work between design, product and engineering. Determining who can change what and how a person understands a refusal involves both how the software works and how it is used.

## An example: the data contract

At Qlik, I am working on a data contract tool. A contract formalises commitments between the teams that produce a dataset and those that use it: the meaning of the fields, responsibilities or expectations of quality and freshness.

In this ongoing project, a structuring difficulty is defining the relation between the contract and the measures already present on the dataset. Declared commitments, possible checks and what their results allow one to assert must be told apart.

One can consider presenting this information in an interface or making it available through an API. In both cases, words, states and rules must remain compatible. A different representation should not turn an unverified commitment into a guarantee that is kept.

This example shows why designing the model matters beyond any particular screen. It does not assume that all these accesses have already shipped.

## What interface generation changes

In my work, assisted prototyping lets me explore behaviours by building a tangible version. It makes it easier to discuss a hypothesis; it does not remove the work needed to turn it into a usable, maintainable product.

Accessibility, legibility, errors, contextual constraints and the discoverability of features still need to be designed and checked. A screen that is quick to generate can still be hard to understand.

The possibility of multiplying interfaces does, however, strengthen the case for shared rules. If each new representation has to redefine what a booking or a contract is, the product’s consistency depends on local decisions that risk diverging.

An explicit model also helps discuss interoperability and migration. It guarantees neither their simplicity nor the economic value of the software: technical dependencies and existing uses still count.

## A shared model does not solve every use

A command line is not a graphical interface reduced to text. A room display does not face the same constraints as an application used to plan your week. Each access requires its own work on the available actions, the useful information and the feedback after an operation.

This adaptation can reveal a weakness in the model itself. So the work does not only flow down from rules to screens: the uses encountered on a new interface can lead to revisiting the shared rules.

When an agent acts on someone’s behalf, the scope of its delegation and the way that person stays in control must also be defined. That is the subject of essay 04.

The question I keep is concrete: if a new interface accessed the product tomorrow, which rules could it reuse, and which would still need clarifying?
