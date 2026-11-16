---
# English translation by Claude of content/fr/travaux/plans-d-etage.md.
# Figures quoted come from Jérôme's prototype:
# https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2
numero: 5
slug: floor-maps
statut: publie
titre: "No longer retracing what was just drawn"
chapo: "At Witco, people book a desk or a room from their floor map. Every desk was drawn in Figma, then traced again by hand on the platform. I designed a base map that keeps that information on export: a plan readable by humans, and indexable by the machine."
meta: "Witco · Booking spaces on a floor map"
strates:
  surfaces: true
  designSystem: true
  modele: true
entree:
  titre: "A floor map that indexes itself as it is drawn"
  description: "A base map design system that carries the structure of spaces, and two exports for two readers: the human and the machine."
visuel:
  src: /images/plans-d-etage/apercu.svg
  alt: "Isometric illustration: a floor plan with its rooms and desks, and above it, in the same frame, the index layer where every space is a blue shape"
cartouche:
  role: "Principal Product Designer"
  duree: "Three months, alongside other projects"
  equipe: "On my own for the logic and the base map; with Jérôme for the tagging tool"
  livrables: "Business logic and user flow, base map design system and method, tagging tool (with Jérôme)"
ecritsLies: [1, 3]
casSuivant: 1
---

The problem looked like a tooling problem: tracing spaces on the platform took too long. Going back up the chain, it turned out to lie elsewhere. The information being traced had already been produced, then lost along the way.

## Before: retracing what had just been drawn

A designer redrew the client’s plan in Figma, placing each desk, then exported it as an image. Customer Success teams uploaded that image to the platform and traced every room and every desk over it, by hand.

![Architect’s plan supplied by a client, annotated by hand: room names linked by lines, department areas outlined in blue](/images/plans-d-etage/plan-client.webp "Fig. 01 · The starting point: the plan supplied by the client")

![The platform’s setup tool: six meeting rooms traced by hand in red over the plan image, the list of resources on the right](/images/plans-d-etage/trace-manuel.webp "Fig. 02 · Every room traced by hand over the image (screenshot: Jérôme)")

The designer knew where each desk was; exporting to an image erased that knowledge, and someone rebuilt it by eye. Every difficulty came from there:

| Symptom | What it reveals |
| --- | --- |
| About two days of tracing for 1,800 spaces | The location of every space is entered again. |
| Shapes misaligned with the drawing | An image is being traced by eye. |
| Sharpness that depends on the screen | The plan only exists as pixels. |
| Names typed in again by hand | The plan ignores the spaces it shows, although the platform knows them. |

Speeding up the tracing would have eased these symptoms. I chose to remove the loss instead, and with it the step that compensated for it.

## A component that knows what it is

In the base map design system, every component carries two things: its appearance and a layer dedicated to export. A desk contains a “desk” layer; a meeting room, a closed office or a zone contain their own. The designer does nothing more than draw: the index builds itself as the plan is drawn.

![Detail of a base map in the Aquarell style: workstations, meeting rooms, phone booths and restrooms marked with icons, a staircase, plants](/images/plans-d-etage/detail.webp "Fig. 03 · Every desk, room and booth is a component that carries its index")

The style draws on the architect’s plans shown in pre-sales: this plan is used to choose where to work, so it has to make people want to come in. Textures, greenery and space icons follow usage rules, so that two designers produce the same plan. Since the index belongs to the components, not to their appearance, I could explore several styles without touching indexing.

![The same plan cut into five vertical bands, each in a style: Origin, Carbon, Aquarell, Modernist Dark, Modernist Light](/images/plans-d-etage/styles.webp "Fig. 04 · The same plan, five styles: Origin, Carbon, Aquarell, Modernist Dark, Modernist Light")

## One plan, two readers

Humans need atmosphere and landmarks; the machine needs named shapes and nothing else. On export, two files of the same size are therefore produced: the PNG keeps the whole drawing, the SVG keeps only the frames to index. Overlaid, every shape in the SVG falls exactly on what it refers to.

```figure
type: strates
legende: "Fig. 05 · Two overlaid exports, at the same size"
strates:
  - nom: SVG
    elements: desk · zones · spaces
    note: For the machine
    actif: true
  - nom: PNG
    elements: partitions · furniture · textures · icons
    note: For humans
```

All that remains is to link each shape to the matching space on the platform. The tagging tool grew out of that idea: Jérôme and I designed it together, and he prototyped it with Figma Make after I left. Eventually, the same index is also meant to let end users pick their seat on the plan.

![Tagging prototype: assigned rooms in green with their names, the cursor shows “Desk 5”, lightning mode switched on in the panel, mini-map at the bottom right](/images/plans-d-etage/mode-eclair.webp "Fig. 06 · The tagging tool: each shape is linked to a space, then the tool offers the next one (prototype and screenshot: Jérôme)")

## Removing risks before they cost anything

The risk was neither in Figma nor in the platform, but at the junction: would an SVG produced on one side be usable on the other? I tested it first, on small plans, with throwaway prototypes coded with AI: one for creation, one for use. The concept held from those first trials.

That left adoption. Nobody reads tutorials: I had colleagues test map creation with a single sample plan split into layers, without any explanation. They picked it up very quickly; the structure of the file was enough to teach the method.

## Results and limits

On Jérôme’s prototype, tagging a small plan went from 3 min 47 s to 20 s. For a building with 1,800 spaces, the estimate goes from two days to two hours. And since names come from the platform, designers no longer have to draw them.

These are prototype figures, not production ones. The principle also has a cost: an export layer to maintain in every component, two files to keep in sync, and a discipline, since a plan drawn without the components produces no index.

When I left, the method, the design system and the tool were designed and validated. Jérôme’s case shows what followed on the tool side: [Witco: AI Proof of Concept](https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2).

:::lead
You do not save time by tracing faster, but by having nothing left to trace.
:::
