---
# Demo essay, taken from the Figma mockup (node 28:342). English translation by Claude.
numero: 7
slug: the-screen-becomes-disposable
statut: brouillon
titre: The screen becomes disposable, the system doesn’t
these: When the interface becomes interchangeable, value and design work concentrate in the objects, states and rules that every surface shares.
genre: Position piece
strates:
  surfaces: false
  designSystem: false
  modele: true
tempsLecture: 6
casCites: [1]
ecritsLies: [5, 6]
limites: |
  Some interfaces remain the product itself: spatial visualisation, exploration, real-time supervision of a system. There, the screen is not disposable, and this essay does not claim otherwise.

  And if open standards make the shared object portable, whoever hosts it becomes replaceable in turn. The thesis is about the value of designing the model, not about the advantage of whoever holds it.
---

Not long ago, designing and building an interface took weeks. Today, a product manager with an assistant gets a working prototype in an afternoon. And many users will soon not open the interface at all: they will state an intention, and an agent will do the rest.

A quick conclusion is often drawn: if the interface costs nothing any more, software loses its value, and design along with it.

I believe this conclusion confuses two things: a piece of software’s interface, and what it lets you manipulate.

## Replacing the interface is not replacing the system

Picture a product team two years from now. The designer works in her tool, the developer in his IDE, the product lead in a chat. Each has their own agent, their favourite surface. Nobody needs to open the same application any more.

Yet they still have to agree on the same things. Where does the project stand? What decision was made, by whom, and why? Who is allowed to change what? What happens if two people, or two agents, change the same item at the same time?

> The obligation to share an application is shrinking. The obligation to share a consistent state remains.

You can picture software as three layers, resting on a technical base.

```figure
type: strates
legende: Fig. 01 · Three layers, resting on what engineering owns
strates:
  - nom: Surfaces
    elements: web · mobile · chat · IDE · CLI · API · agents
    note: Increasingly interchangeable
  - nom: Design system
    elements: tokens · components · patterns · usage rules
    note: What keeps interfaces consistent, for teams and agents alike
  - nom: Model
    elements: objects · relations · dependencies · states · permissions · decisions · history
    note: What everyone has to agree on
    actif: true
base:
  elements: storage · identities · transactions · security
  note: "Outside the layers: the domain of engineering and operations"
```

The surfaces, at the top, become interchangeable: everyone will be able to choose, or even generate, their own. Just below, the design system says how they behave; it is increasingly read by agents as much as by teams. At the very bottom, the technical base belongs to engineering and operations. In between sits a layer we rarely notice because we always see it through a screen: the model, that is, the objects the product handles, their relations, the states they go through, the rules that say who can act on what.

That is where much of software’s lasting value lies. And it is a designed layer, in the strong sense, even when nobody designed it deliberately.

## An example: the data contract

I work on data governance products. A data contract formalises what binds a team that produces a dataset to the teams that consume it: what the fields mean, who is accountable for them, which freshness and quality guarantees apply.

You can display that contract in an interface, query it through an API, have an agent check it. None of these surfaces is the contract.

The hard work was never the screen. It was deciding what a contract is: which states it goes through, who can propose it, who must accept it, what happens when a guarantee no longer holds, and how a consumer finds out before their dashboard goes wrong.

These decisions outlive every interface. Made with care, they make every surface simpler, including the ones we have not imagined yet. Made halfway, they make every surface confusing, whatever its visual quality. No polished screen makes up for an inconsistent model.

## The serious objection: agents will make migration free too

One could object: if an agent can export data, convert formats and rebuild integrations overnight, the model becomes replaceable too. No more lock-in, no more value.

That is partly true. Data migrates better and better, and that is good news.

But what migrates badly is not the data, it is the meaning: why a field has this name, which decision closed off an option, which rule forbids an action, which relation links two objects that look independent. An export carries values, rarely intentions.

Above all, the more we delegate to agents, the more explicit that meaning has to be. An agent cannot guess a rule that exists only in three people’s heads. It does not know an action is irreversible if nobody has described it as such.

Taken to its end, then, the objection does not reduce the need to model: it increases it. An explicit, consistent, documented model is precisely what makes migration, interoperability and delegation possible.

## What it changes for design

Design does not disappear. It moves down a floor. The question shifts from “what does this screen look like?” to “which objects, which states, which transitions, who can do what, on whose behalf, and how do you go back?”.

When a machine acts on someone’s behalf, you have to decide what that person agrees to delegate, what they are asked to confirm, how they see afterwards what was done, and how they take back control. These are not implementation questions. They are questions of human understanding.

Engineering defines what the system can do: capabilities, permissions, execution and rollback mechanisms. Design works on what humans understand, agree to delegate and can control. One does not go without the other.

Deliverables change accordingly: object models, state diagrams, permission and autonomy matrices, composition rules structured enough to guide both teams and agents. A good result can still be a screen. It can also be a model that saves five teams from designing five versions of the same concept.

## What remains when the screen fades

To me, designing well has always meant removing what has no reason to appear. A good system absorbs complexity instead of passing it on to the people it serves. It fades away while it works.

AI takes this idea to its conclusion: the interface itself can fade away. What remains is the system working underneath. And it still takes someone to design it.

:::question
In your product, what would survive if nobody opened the interface any more?
:::
