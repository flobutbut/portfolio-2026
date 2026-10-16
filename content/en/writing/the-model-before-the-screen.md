---
# English translation by Claude of content/fr/ecrits/le-modele-avant-l-ecran.md.
numero: 2
slug: the-model-before-the-screen
statut: publie
titre: "The model before the screen"
these: "Design must take part in defining the product’s objects and rules. Screens make it possible to test them and make them evolve."
strates:
  surfaces: true
  designSystem: false
  modele: true
tempsLecture: 5
casCites: [1, 3, 4]
ecritsLies: [3, 5]
---

When you open a product, you see screens. Yet the essentials were decided before them: which objects exist, what can be done to them, who is allowed to do it, what is guaranteed. These decisions are almost never visible. They can only be read through their consequences, page after page.

That is why I rarely start with the screen. “Before” here means a priority of thought, not a rigid sequence: a prototype can also help discover the model.

## Rules set early

A product is built on rules: who can do what, what is guaranteed, what is forbidden, what happens when something fails. These rules are set early, in discussions between Product and Engineering, often before a designer has opened a file.

If design is not there, it discovers them afterwards, drawn in negative in the screens it is asked to produce. At that stage, questioning them remains possible, but costs more once other decisions and development depend on them.

My way of working starts from there: being present when these rules are decided, with what users have taught us, rather than when they need to be laid out on a page.

## These rules live in the model

A rule does not exist in a vacuum. It applies to something: an object, its states, its relations with others. That is what I call the model: the objects the product handles, their relations, their states and the rules that govern them. Their representation in the data, the navigation and the pages must stay consistent, without necessarily being identical. A page template is one way of presenting this model, not the model itself.

At Desoutter, the model was right in front of us: the physical installation itself. Controllers drive tools, and each tool has its programs. By basing the main navigation on this structure, each page became a level of the tree, and we chose to roll a tool’s state up to the overview. The important decision was not graphic; it was making the installation the backbone of the product.

On data contracts, at Qlik, the first question was not “what does a contract look like?”, but “what relation links it to the dataset?”. The dataset already has its quality measures. Reusing them rather than inventing new ones avoids two vocabularies and two truths that end up contradicting each other. This decision has structured the ongoing work. It leaves the expectations attached to each commitment to be specified: sharing a measure does not impose an identical threshold on all consumers.

In both cases, I anticipated the rule instead of discovering it in the screen. It is less spectacular than a beautiful interface. It makes it possible to discuss structuring decisions before they ripple through several interfaces.

## Once the model is set, design repeats

The most concrete benefit of an explicit model is that it makes design reproducible.

At Desoutter, every level of the tree followed the same template. This repetition was meant to make it easier to find your way. By the end of my assignment, the front-end team was building new pages without going back through screen-by-screen design.

The model guides the design of screens; in return, working with them reveals its ambiguities or gaps. It provides a shared language so that designers, product managers and engineers discuss the same objects.

## A model is never finished

Setting the model early does not mean freezing it. A digital product evolves constantly: a new feature can lead to adding an object, creating a relation or changing an existing rule.

So a good model is not the one that foresaw everything. It is the one that welcomes these changes without calling everything into question: a new object finds its place next to the others, a new relation does not contradict the old ones, and the consequences for existing screens remain identifiable. Some changes do, however, require revisiting the model and its representations.

The opposite is a warning sign. If every new feature forces the creation of a new object, unable to build on what already exists, the model may be fragmenting: we create redundancy, two objects that say almost the same thing, and a complexity nobody chose. Before adding an object, I check whether an existing object can carry the need without changing its meaning. Reusing at all costs would be another mistake: two distinct concepts must be able to stay distinct.

That is also why design must remain present after framing. Features that change objects or their rules require reopening this discussion, then testing its effects in the journeys.

## Limits

This approach has two limits I don’t want to hide.

The first: the model does not always come first. On a fuzzy subject, I sometimes prototype first, in code, with Claude or Figma Make, to bring out the objects by manipulating something. The prototype is then not a solution; it is a tool for finding the model.

The second: having the right model is not enough. In my proposal on overviews at Qlik, the rule is simple, but applying it means reworking every existing type, a heavy undertaking. An architecture cannot be imposed all at once. The adoption path I propose is to apply the rule progressively, one type at a time, with templates to share the structure. A sound model that cannot be adopted remains a good idea on paper.

## What remains

Designing the model before the screen does not delay design. It places it where it carries weight: when the rules are decided.
