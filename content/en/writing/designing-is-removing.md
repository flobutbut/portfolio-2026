---
# English translation by Claude of content/fr/ecrits/concevoir-c-est-retirer.md.
numero: 1
slug: designing-is-removing
statut: publie
titre: "Designing is removing"
these: "A well-designed system reduces the effort needed to go from a need to an action, without removing the landmarks that matter."
strates:
  surfaces: false
  designSystem: false
  modele: true
tempsLecture: 4
casCites: [4]
ecritsLies: [2, 3, 4, 5]
---

> Designing is not adding visible care to a working product: it is removing, one by one, every element that exists only because nobody bothered to question it. A well-designed system absorbs the gap between what it is given and what is needed, limiting the effort asked of the person it serves. It avoids drawing attention needlessly, while keeping within reach the landmarks needed to understand and act.

This text is the starting point for the other four. It says what I look for when I design, and why it shows so little.

## Visible care is not care

It is tempting to measure design work by what it adds: an animation, an illustration, one more screen to explain. That kind of care shows; it looks good in a review.

In products built through successive additions, some elements remain because they were there before or because a piece of data was available. Nobody questions their usefulness any more. The most useful work often consists in asking that question, element by element.

At Qlik, the overview of a dataset displayed its full schema, sometimes hundreds of columns. I proposed keeping the exhaustive schema for a dedicated view. The overview could then help identify the dataset, understand what it is for and reach the relevant actions. It is a proposal for distributing information, whose adoption is still being worked on.

## Absorbing the gap

Between what a user gives the system and what they need, there is almost always a gap. Either the system takes it on, or it leaves it to the user.

Take a simple example: booking a meeting room. The user knows what they want: a room for six people, Tuesday afternoon, near their team. A system that only lists the rooms leaves them all the work: checking capacities, comparing time slots, finding where the rooms are. A system that absorbs the gap starts from their need and offers the two or three rooms that fit.

In this example, removing means reducing the work of comparison, not just the number of elements displayed. The selection must stay understandable and make it possible to explore the other rooms if the proposed criteria do not fit.

## Fading away, then reappearing at the right moment

Removing does not mean deleting. A dataset’s schema remains indispensable: the proposal is to move it into a dedicated view, reachable from the overview. Moving it is only useful if the reader knows where to find the details again.

The same logic applies to states, errors and confirmations. A well-designed system does not comment on everything it does. It makes its state accessible without needlessly demanding attention, and flags what requires a decision or a confirmation. In a monitoring activity, a normal state can itself be essential information.

## What we don’t let appear

This work has a flaw: it barely shows. Nobody notices the column that isn’t there, or the question they never had to ask. The best result of design work is often something the user never had to carry.

That is why the essays that follow mostly talk about what lies beneath the screens: the model (02), business patterns (03), what a person can delegate to an agent (04), and what must remain shared across several interfaces (05).

## Limits

Removing can go too far. An element that seemed superfluous sometimes served a rare but real use, and removing it then shifts the gap onto someone else. Removing therefore requires knowing who you are removing for, and what you are really taking away from them.

## What remains

Removing is useful when it reduces effort without taking away the landmarks needed to understand and act. The question is as much what we simplify as what we must leave visible.
