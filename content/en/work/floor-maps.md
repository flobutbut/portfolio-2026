---
# English translation by Claude of content/fr/travaux/plans-d-etage.md.
# Figures quoted come from Jérôme's prototype:
# https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2
numero: 5
slug: floor-maps
statut: publie
titre: "No longer retracing what was just drawn"
chapo: "At Witco, people book a desk or a room from their floor map. To get there, a designer drew every desk in Figma, then someone traced it again by hand on the platform. Rather than speeding up that second tracing, I designed a base map that no longer loses information on export: a plan readable by humans, and indexable by the machine."
meta: "Witco · Booking spaces on a floor map"
strates:
  surfaces: true
  designSystem: true
  modele: true
entree:
  titre: "A floor map that indexes itself as it is drawn"
  description: "A base map design system that carries the structure of spaces, and two exports for two readers: the human and the machine."
cartouche:
  role: "Principal Product Designer"
  duree: "Three months, alongside other projects"
  equipe: "On my own for the logic and the base map; with Jérôme for the tagging tool"
  livrables: "Business logic and user flow, base map design system and method, tagging tool (with Jérôme)"
trenteSecondes:
  probleme: "Every space on a plan was drawn in Figma, exported as an image, then traced again by hand on the platform: about two days for a building with 1,800 spaces. People were rebuilding information that already existed when the plan was drawn."
  decision: "Stop losing that information. Every base map component carries its own index layer, exported to an SVG aligned pixel for pixel with the image."
  ceQuiReste: "A principle settled before I left and carried over as is into the prototype: the base map carries its own index, and the tool only has to link it to the platform."
titreDecisions: "Removing the loss rather than compensating for it"
decisions:
  - titre: "Keep the information instead of rebuilding it"
    plutotQue: "speeding up the tracing of spaces in the platform’s tool"
    parceQue: "the designer knows where each desk is when placing it; exporting to an image erased that knowledge"
    auPrixDe: "an export layer to maintain in every component"
  - titre: "Two readers, two files, one frame"
    plutotQue: "a single file serving as both image and index"
    parceQue: "humans need atmosphere and landmarks, the machine needs named shapes and nothing else; at the same size, the two overlay without adjustment"
    auPrixDe: "two exports per plan, which must stay in sync"
  - titre: "The structure teaches the method"
    plutotQue: "documentation to read before starting"
    parceQue: "nobody reads tutorials; a sample plan split into layers makes sense as soon as you open it"
    auPrixDe: "a sample file to keep up to date with the design system"
titreRegles: "What the base map guarantees"
regles:
  - "Placing a component indexes it: nobody has an indexing step to remember."
  - "Each reader gets what it needs and nothing more: the image for humans, named shapes for the machine."
  - "Someone opening the file must be able to create a plan without reading the documentation."
ecritsLies: [1, 3]
casSuivant: 1
---

The problem looked like a tooling problem: tracing spaces on the platform was too slow. Going back up the chain, it turned out to lie elsewhere. The information being traced had already been produced, then lost along the way.

![Floor plan in the Witco platform: available meeting rooms in green, an occupied room in red, a “Meeting room 4” card with a booking button](/images/plans-d-etage/reservation.webp "Fig. 01 · On the user side: booking a room from the plan (screenshot: Jérôme)")

## Before: retracing what had just been drawn

For a client to book from a map, four steps followed one another:

| Step | Who | What is done |
| --- | --- | --- |
| 1 | Customer Success | Create every room and every desk on the platform. |
| 2 | Designers | Redraw the plan in Figma, placing each desk, then export it as PNG. |
| 3 | Customer Success | Upload the image to the platform’s setup tool. |
| 4 | Customer Success | Trace every room and every desk again over the image. |

![Architect’s plan supplied by a client, annotated by hand: room names linked by lines, department areas outlined in blue](/images/plans-d-etage/plan-client.webp "Fig. 02 · The starting point: the plan supplied by the client, annotated with its room names")

At step 2, the designer places each desk and knows exactly where it is. At step 4, someone else traces it again by eye. In between, exporting to an image flattened everything: the plan no longer knew what it showed.

![The platform’s setup tool: six meeting rooms traced by hand in red over the plan image, the list of resources on the right](/images/plans-d-etage/trace-manuel.webp "Fig. 03 · Step 4: every room traced by hand over the image (screenshot: Jérôme)")

The difficulties met at step 4 all came from that loss:

| Symptom | What it reveals |
| --- | --- |
| About two days of tracing for 1,800 spaces | The location of every space is entered again. |
| Shapes misaligned with the drawing | An image is being traced by eye. |
| Sharpness that depends on the screen | The plan only exists as pixels. |
| Names typed in again by hand | The plan ignores the spaces it shows, although the platform knows them. |

Speeding up the tracing would have eased these symptoms. I chose to remove the loss instead, and with it the step that compensated for it.

## A component that knows what it is

### Placing a desk indexes it

In the base map design system, every component carries two things: its appearance and a layer dedicated to export. A desk contains a “desk” layer; a meeting room, a closed office or a zone contain their own. The designer does nothing more than draw. The index builds itself as the plan is drawn.

This design system does not stop at appearance. It also describes what each element is, and that description travels with it all the way to the platform.

![Detail of a base map: workstations, meeting rooms, phone booths and restrooms marked with icons, a staircase, plants](/images/plans-d-etage/detail.webp "Fig. 04 · Every desk, room and booth is a component that carries its index")

The method follows the same principle: each move maps to a layer group. The structure of the file shows the order in which the plan is made.

```figure
type: parcours
legende: "Fig. 05 · The method: each step is a layer group"
etapes:
  - { nom: "Place the plan", description: "The client’s document serves as a tracing layer." }
  - { nom: "Trace the partitions", description: "Walls and rooms are redrawn." }
  - { nom: "Position the furniture", description: "Each component brings its index." }
  - { nom: "Add the assets", description: "Textures, plants, space icons." }
```

### A plan you want to inhabit

For the graphic style, I started from the architect’s plans shown in pre-sales rather than from technical drawings. This plan is used to choose where to work. It has to make people want to come in, not just list workstations. Hence the textures, the plants to bring some life, and an icon system that identifies spaces without a legend. Usage rules frame every component and every texture, so that two designers produce the same plan.

![Complete floor plan in the Origin style: a U-shaped building around a wooded garden, with its workstations, rooms and circulation](/images/plans-d-etage/plan.webp "Fig. 06 · A complete floor, Origin style")

I explored several styles on this same plan. From one style to the next, only the backgrounds, partitions and greenery change appearance: the layout stays identical. Since the index is carried by the components, not by their appearance, changing style does not affect indexing.

![The same plan cut into five vertical bands, each in a style: Origin, Carbon, Aquarell, Modernist Dark, Modernist Light](/images/plans-d-etage/styles.webp "Fig. 07 · The same plan, five styles: Origin, Carbon, Aquarell, Modernist Dark, Modernist Light")

## One plan, two readers

### What you see and what you index

The same plan has two readers who do not expect the same thing. Humans need atmosphere and landmarks. The machine needs named shapes, and nothing else.

On export, two files of the same size are therefore produced. The PNG holds the whole drawing. The SVG keeps only the frames to index. Because they share the same frame, they overlay without adjustment: every shape in the SVG falls exactly on the drawing it refers to. Together, the two files form a simple contract between the person who draws and the tool that uses the plan.

```figure
type: strates
legende: "Fig. 08 · Two overlaid exports, at the same size"
strates:
  - nom: SVG
    elements: desk · zones · spaces
    note: For the machine
    actif: true
  - nom: PNG
    elements: partitions · furniture · textures · icons
    note: For humans
```

The index is not only for tagging. Eventually, the same shapes are meant to let end users pick their seat directly on the plan. Once the structure lives in the drawing, every new use benefits from it without touching existing plans.

::decisions

## What is left to do when the plan knows everything

### Linking a shape to a name

With an SVG already split into shapes, tagging no longer requires tracing: each shape only has to be linked to the matching space on the platform. The tool grew out of that idea, and Jérôme and I designed it together. Everything was settled before I left; Jérôme then took the project over to prototype it with Figma Make.

The work that remains is no longer drawing, it is attention. The tool spares it:

- **Lightning mode**: most clients name their spaces in the order of the plan (M102, M103…). Once a space is assigned, the tool offers the next one.
- **Label under the cursor**: the name being assigned follows the pointer, so the eyes stay on the plan.
- **Dynamic names**: labels come from the platform and update if a name changes. Designers no longer have to draw them.
- **Mini-map**: on a large plan, it shows where you are.

![Tagging prototype: assigned rooms in green with their names, the cursor shows “Desk 5”, lightning mode switched on in the panel, mini-map at the bottom right](/images/plans-d-etage/mode-eclair.webp "Fig. 09 · Lightning mode: the tool offers the next desk, its name follows the cursor (prototype and screenshot: Jérôme)")

## Removing risks before they cost anything

The risk was neither in Figma nor in the platform, but at the junction: would an SVG produced on one side be usable on the other? I tested that junction first, on small plans, with throwaway prototypes coded with the AI of the time: one for creation, one for use. The concept held from those first trials.

The second risk was adoption of the method. A method you have to learn from a tutorial ends up poorly applied. So I had colleagues test map creation with a sample plan split into layers, without any explanation. They picked it up very quickly: the structure was enough.

The project went through no crisis. I do not put that down to luck: both risks were removed early, at small scale, before any real plan depended on them.

## Results and limits

### Two days down to two hours, on a prototype

The figures come from the prototype Jérôme built after I left. On a small sample plan, tagging went from 3 min 47 s to 20 s. For a six-floor building with 1,800 spaces, the estimate goes from two days to two hours. Since labels are generated, Jérôme estimates that designers save 20% of the time it takes to create a plan.

These figures come from a prototype, not from a tool in production. The gain also depends on discipline: a plan drawn without the components produces no index. Lightning mode, for its part, assumes names that follow the order of the plan, which is common but not universal.

When I left, the method, the design system and the tool were designed and validated. The prototype and what followed belong to Jérôme and the team in place.

Jérôme’s case, on the tool side: [Witco: AI Proof of Concept](https://jeromedesigns.notion.site/Witco-AI-Proof-of-Concept-295340f4e6108081aba3fc875e571af2).

:::lead
You do not save time by tracing faster, but by having nothing left to trace.
:::
