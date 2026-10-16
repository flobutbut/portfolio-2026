---
# English translation by Claude of content/fr/ecrits/un-design-system-qui-s-arrete-au-bouton.md.
numero: 3
slug: a-design-system-that-stops-at-the-button
statut: publie
titre: "A design system that stops at the button"
these: "Business patterns extend the components of a design system by organising interactions around recurring tasks."
strates:
  surfaces: false
  designSystem: true
  modele: false
tempsLecture: 4
casCites: [4, 1]
ecritsLies: [2, 4]
---

When a team launches a design system, it almost always starts in the same place: colours, typography, then buttons, fields, checkboxes, modals. It is useful, even necessary. It is the most easily identifiable part of the system. Designing it well already requires dealing with interactions, states and accessibility.

Often, the design system stops there. What remains is sharing the decisions that organise tasks at the scale of pages and journeys.

## What components don’t say

A button organises how an action is triggered. A field frames input and its states. These components carry essential behaviours, but they are not enough to organise a complete business task.

Yet a product is not a collection of fields and buttons. It is a set of business objects, the ones its users handle every day, and of things they are trying to accomplish with them. If the design system only talks about generic components, each team reinvents on its own how to present these objects. Pages look alike visually, because they share the same buttons, but they do not behave the same way. The consistency is skin-deep.

## A business pattern encodes an intention

At Qlik, each resource type had its own overview, built as needs arose. I proposed a shared page template to help identify the resource, understand what it is for and reach the relevant actions. This proposal is still being worked on. It organises information around an intention, while leaving each resource type its own content.

The template ties a structure to this intention. Its reuse depends on what the tasks really have in common; the content needed to evaluate a dataset will not be that of a pipeline project.

At Desoutter, the same logic applied at another scale. Every level of the installation, from controller to tool to tightening program, followed the same template: where am I, what state is what I am looking at in, what does it contain, what can I do here. This template was not a component. It encoded the way a technician goes down into their installation to understand and fix a problem.

Components stabilise elementary interactions. Business patterns organise how they combine around recurring tasks, in the product’s vocabulary.

## Where consistency plays out

A product gains consistency when users find on a new page the landmarks they learned elsewhere. Patterns contribute to this by treating intentions that recur across different objects in a comparable way.

Business patterns have another, more discreet effect: they move decisions. Without them, every new feature forces a team to ask how to present its object. With them, part of the answer is shared; the team can focus on differences and exceptions.

Designing them requires specific work. You have to understand the business, spot the intentions that recur from one object to another, and accept that a pattern never covers every case. Without this work, sharing components leaves part of the usage decisions to each team.

## The rules that hold them together

A business pattern without usage rules degrades quickly. Each team adapts it a little, and within a few versions it no longer means anything. Usage rules say when it applies, when it does not, and what it must contain. They are not constraints added after the fact: they are what conveys the intention to those who were not there when the pattern was designed, teams or agents that help build the interfaces.

A possible rule for the overview would be: present the information needed to identify the resource and decide what to do next; give explicit access to the exhaustive views; keep a preview of the details when it is essential to that decision. This last point matters: lightening a page does not justify systematically moving all detailed information.

## Limits

A business pattern only makes sense if the intention really recurs. If situations rarely repeat, designing and maintaining it can cost more than it brings. And it cannot be imposed all at once: on an existing product, adopting it means reworking what is already built, object by object.

## What remains

Components share interactions and landmarks. Business patterns extend this work to the scale of tasks. Their value is measured by the decisions they make reusable without erasing useful differences.
