---
# English translation by Claude of content/fr/ecrits/l-ia-deuxieme-usager-du-produit.md.
numero: 4
slug: ai-the-products-second-user
statut: publie
titre: "AI, the product’s second user"
these: "When an agent acts on someone’s behalf, designing the product means defining what that person can delegate to it, how they stay in control and how they understand what was done."
strates:
  surfaces: false
  designSystem: true
  modele: true
tempsLecture: 4
casCites: []
ecritsLies: [3, 5]
---

When a person uses a product, they interpret its screens, choose an action and observe the result. When they delegate that action to an agent, part of this journey becomes less visible. The product must still allow them to understand and decide.

I call the agent a “second user” here because it accesses the product and acts in it. The person remains the one whose intention it serves. This text is a direction of work, not the account of a system I have shipped.

## Telling building the product apart from using it

An agent that helps a team build an interface can make use of components, patterns and their usage rules. This extends the design system work described in essay 03.

An agent that books a room or changes an object acts in the product for someone. It needs to understand the available actions, their conditions, their effects and the limits of its authorisation. It is this second situation that interests me here.

Both uses need explicit rules, but they do not call for the same resources or the same controls.

## An intention does not define the whole delegation

Imagine a request: “Find a room for our Tuesday meeting.” On its own, it does not say whether the agent should propose options or book, whether it may move an existing booking, or what it should do if no suitable room is available.

The design work consists in making this scope understandable. What can be executed directly? Which change requires confirmation? In which case should the agent come back to the person?

The answer depends in particular on the consequences of an error, the possibility of undoing it and the preferences expressed. Asking for confirmation at every step is not a universal solution: it can make delegation as demanding as acting directly.

## Making rules explicit, then enforcing them

An agent can infer a missing rule or look for context. It can also be wrong. So what is implicit does not disappear: it becomes a source of uncertainty that the person does not necessarily see.

Describing objects, states, actions and their effects reduces this ambiguity. It is not enough to guarantee correct execution. The rights and conditions of an action must also be checked by the product. An instruction saying not to modify an object does not replace a permission that forbids it.

This distinction echoes the one between agents and predefined workflows: agents adapt their actions to the information they receive, which makes evaluations and controls necessary, beyond documentation. [Building effective agents, Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

## Staying in control during and after the action

The person must be able to understand what was done, what failed and what remains to be decided. When an action is reversible, the way to undo it must be accessible; when it is not, its consequences must be understandable before execution.

In the booking example, a useful result would state the room chosen, the time slot and any gaps with the request. If no booking was made, it should not suggest that the task is done.

This feedback is part of the product, even when the exchange goes through an external agent. It relies on states and a history clear enough to explain the action to the person.

## What remains to be tested

I prototype with agents every day, but I do not yet have a shipped case that establishes the effectiveness of this approach to delegation. It would need to be evaluated on specific situations: task success, respect for authorisations, understanding of the result, ability to correct an error and relevance of confirmations.

The absence of human correction would not be enough to prove the quality of the system. A person may not notice an error or may not know how to intervene.

Designing for this second user means organising a delegation that the first can understand, limit and take back.
