---
# English translation by Claude of content/fr/travaux/workplacetobe.md. Planned visuals only show in previews until supplied.
numero: 2
slug: workplacetobe
statut: publie
titre: "One product, several surfaces"
chapo: "WorkplaceToBe had to remain a single product while being delivered on several surfaces: web, mobile, Outlook, room displays and desk labels. I led its redesign on the design side by building a shared system, able to adapt the same uses to each context."
meta: "SharingCloud · Workplace management"
strates:
  surfaces: true
  designSystem: true
  modele: true
visuel:
  src: /images/workplacetobe/apercu.svg
  alt: "Isometric illustration: several surfaces arranged around one product"
cartouche:
  role: "Principal Product Designer"
  duree: "2022 – 2025"
  equipe: "Two Product Owners, three front-end developers, a Scrum Master"
  livrables: "Multi-surface redesign, design system"
ecritsLies: [5, 2]
casSuivant: 3
---

SharingCloud published WorkplaceToBe, a workplace management platform for booking spaces, declaring office presence and following life on site.

I joined the team in 2022 as Principal Product Designer to lead the redesign with two Product Owners, three front-end developers and a Scrum Master. I also mentored a work-study designer.

## A product that had become fragmented

WorkplaceToBe had been built through successive additions. Over time, its interfaces had accumulated different components, behaviours and sometimes technologies.

So the problem was not only visual: without a shared foundation, every new feature or new surface deepened the fragmentation.

I proposed starting **with a shared design system, with the support of the front-end developers**.

```figure
type: schema
legende: "Fig. 01 · From juxtaposed additions to a shared foundation: before, each surface brings its own components; after, four shared levels."
blocs:
  - colonnes:
      - intitule: "Before"
        note: "Each addition brings its own components."
        blocs:
          - surfaces: ["Web", "Mobile", "Outlook"]
      - intitule: "After"
        note: "Patterns carry the unity, libraries the differences."
        blocs:
          - bibliotheques:
              - { surtitre: "Library", nom: "Web and mobile" }
              - { surtitre: "Library", nom: "Outlook" }
              - { surtitre: "Library", nom: "Screens and labels" }
          - couches:
              - { nom: "Patterns", detail: "book, declare presence", emphase: true }
              - { nom: "Components", detail: "buttons, fields, icons" }
              - { nom: "Tokens", detail: "colours, typography, spacing" }
```

## Starting again from uses

Rather than treating each interface separately, we went back over the product’s main uses:

- **Booking**: room, desk, parking space, bike or locker.
- **Presence**: declaring your office days and seeing where your team is.
- **News**: following life on site.
- **Events**: seeing what is happening on site.

This reading made it possible to see Outlook, room displays or DeskTags not as standalone products, but as **specialised access points to WorkplaceToBe**.

## Shared objects

The data model already existed on the back end. My work consisted in identifying the objects users actually handled and giving them a consistent representation in the interface.

A booking, a space or a presence had to keep the same meaning, the same vocabulary and the same essential information, whatever the surface.

```figure
type: schema
legende: "Fig. 02 · The objects as the interface presents them, read as sentences: space comes back in most uses."
fond: false
blocs:
  - alignee: true
    chaine:
      - { objet: "Site", description: "a building" }
      - { liaison: "contains" }
      - { objet: "Floor", description: "its zones, its plan" }
      - { liaison: "contains" }
      - { objet: "Space", description: "room, desk, parking, bike, locker", emphase: true }
  - alignee: true
    chaine:
      - { objet: "Person", description: "an employee" }
      - { liaison: "makes" }
      - { objet: "Booking", description: "a space, a time slot, a person" }
      - { liaison: "concerns" }
      - { objet: "Space", description: "room, desk, parking, bike, locker", emphase: true }
  - alignee: true
    chaine:
      - { objet: "Person", description: "an employee" }
      - { liaison: "declares" }
      - { objet: "Presence", description: "at the office, remote, absent" }
  - alignee: true
    chaine:
      - { objet: "Team", description: "who is at the office" }
      - { liaison: "groups" }
      - { objet: "Person", description: "an employee" }
  - alignee: true
    chaine:
      - { objet: "Site", description: "a building" }
      - { liaison: "publishes" }
      - { objet: "News", description: "and events, per site" }
```

## One use, several contexts

Web and mobile formed the core of the product. The other surfaces only took on the uses relevant in their context.

```figure
type: schema
legende: "Fig. 03 · One use, several contexts: each use only appears on the surfaces where it makes sense."
blocs:
  - usages:
      lignes:
        - usage: "Book a room"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook", note: "from the invitation" }
            - { texte: "RoomPad", note: "at the room" }
            - { texte: "BoxPad" }
        - usage: "Book a desk"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
            - { texte: "DeskTag", note: "occupancy", ton: contour }
        - usage: "Parking, bike, locker"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
        - usage: "Declare presence"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
        - usage: "See your team"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
        - usage: "News"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
        - usage: "Events"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
      legende:
        - { texte: "full use" }
        - { texte: "information only", ton: contour }
      note: "A surface missing from the row does not offer that use."
```

So a feature was not duplicated everywhere on principle. It only appeared where it made sense: booking from Outlook, acting directly at a room, or showing who occupies a desk.

## What stays shared, what changes

The design system shared **tokens** — the named values for colour, spacing or typography —, components and interaction patterns. This foundation was adapted into libraries specific to each surface.

Three rules guided these adaptations:

1. **Objects and vocabulary stay the same.**
2. **Interaction adapts to the context and to the available density.**
3. **A new surface exposes existing uses; it does not recreate the product.**

We identified the shared uses, then kept for each surface those relevant in its context. Booking a room from an Outlook invitation and doing it on a RoomPad at the door are the same use, but different situations. The room display was not meant to take on all the day-planning features available on the web.

## Result and scope

The new web home brought the main uses together around the employee’s day: their bookings, their team’s presence, events and news from the site.

![WorkplaceToBe home screen, web and mobile](/images/workplacetobe/accueil.webp "Fig. 04 · The home screen, on the web and on mobile: the user’s day, their bookings, their team’s presence.")

![WorkplaceToBe on-site screens: RoomPad outside a room, BoxPad free and occupied, desk labels](/images/workplacetobe/sur-place.webp "Fig. 05 · On site, the interface takes the shape of the space: the RoomPad outside the room, the BoxPad on the booth, the label on the desk.")

The redesign established a shared framework for evolving the interfaces: shared objects, identified uses and adaptation rules. This framework was meant to limit the decisions revisited for each new surface. The case does not, however, document any measure of design time saved or any comparative evaluation of the experience across surfaces.

SharingCloud was [acquired by Witco in June 2024](https://www.witco.io/fr/blog/witco-acquiert-sharingcloud-et-renforce-son-leadership-dans-les-solutions-smart-office).

This work is representative of how I approach this kind of product: **start from uses, stabilise the objects, then adapt their representation to each context.**
