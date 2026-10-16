---
# English translation by Claude of content/fr/travaux/data-contracts.md. The planned figure only shows in previews until supplied.
numero: 3
slug: data-contracts
statut: publie
titre: "Making commitments around data explicit"
chapo: "At Qlik, I am designing a data contract tool to make explicit the commitments between the teams that produce a dataset and those that use it. The challenge: linking these commitments to the information and quality measures already present in the platform. This work is in progress."
meta: "Qlik · Data integration"
strates:
  surfaces: false
  designSystem: false
  modele: true
cartouche:
  role: "Senior Product Designer"
  duree: "Since June 2025, in progress"
  equipe: "A Product Manager, a Product Owner, front-end and back-end developers"
  livrables: "Contract model, usage patterns, code prototypes"
ecritsLies: [2, 5]
casSuivant: 4
---

Since June 2025, I have been Senior Product Designer on data integration at Qlik, as the Talend and Qlik products converge after the acquisition. I work with a Product Manager, a Product Owner and front-end and back-end developers.

## Formalising what is expected of data

What a column means, who is accountable for it, what freshness or quality can be expected: a contract brings these commitments together so that producers and consumers can refer to them. Some information describes the meaning of the data or responsibilities; other information can be tied to checks. Declaring a commitment and verifying that it is kept are two distinct functions.

## The approach: define the commitment before drawing the screen

Before defining the screens, I started by describing what a contract is: who proposes it, who accepts it, what it guarantees, which states it goes through, and what happens when it is no longer kept.

In the proposed model, the contract is a product object in its own right, with an owner and a lifecycle still to be defined.

## Starting from what already exists

The contract does not come from nothing: it relies on a dataset that already has its own quality measures, by dimension and by validation rule. So the first question was not “what does a contract look like?”, but “what relation links it to the dataset?”.

I chose to build on these measures rather than create a second measurement system specific to contracts. This relation was meant to avoid duplicating the description of quality. It does not remove the need to specify what each commitment requires: a shared measure and the threshold a consumer expects are not the same thing.

To illustrate this distinction, imagine a commitment to update before 8 a.m. The time of the last update is a measure; “before 8 a.m.” expresses the expectation; comparing them makes it possible to assess whether the commitment is kept. This example explains the principle, without describing a shipped feature.

## From the list to patterns

We first listed everything a contract can guarantee, then gave rules to each type of guarantee: some repeat, others are unique by nature. We used these rules to structure the types of guarantees and to design usage patterns for creating, editing and monitoring them.

The goal is to share vocabulary and recurring behaviours, while keeping the differences between types of guarantees. Screens and prototypes then make it possible to test these rules.

![Planned figure](a-venir "the contract links commitments to consumers with the dataset’s information and measures")

## The prototype as a decision tool

I prototyped in code, with Claude and Figma Make, to make behaviours tangible in discussions with engineering. The prototype supports the discussion; on its own, it does not validate the rules or their usability.

## Result and limits

This work is in progress. The case presents the modelling and prototyping approach; it does not claim any deployment result or measured impact on users.
