---
# Repris de docs/Portfolio/02b_Cas_02_WorkplaceToBe.md. Les « Visuel prévu » n’apparaissent qu’en aperçu tant qu’ils ne sont pas fournis.
numero: 2
slug: workplacetobe
statut: publie
titre: "Un produit, plusieurs surfaces"
chapo: "WorkplaceToBe devait rester un seul produit tout en étant distribué sur plusieurs surfaces : web, mobile, Outlook, écrans de salle et étiquettes de bureau. J’ai mené sa refonte côté design en construisant un système commun, capable de décliner les mêmes usages selon chaque contexte."
meta: "SharingCloud · Gestion des espaces de travail"
strates:
  surfaces: true
  designSystem: true
  modele: true
visuel:
  src: /images/workplacetobe/apercu.svg
  alt: "Illustration isométrique : plusieurs surfaces réparties autour d’un même produit"
cartouche:
  role: "Principal Product Designer"
  duree: "2022 – 2025"
  equipe: "Deux Product Owners, trois développeurs front-end, un Scrum Master"
  livrables: "Refonte multi-surfaces, design system"
ecritsLies: [5, 2]
casSuivant: 3
---

SharingCloud éditait WorkplaceToBe, une plateforme de gestion des espaces de travail permettant de réserver des espaces, déclarer sa présence au bureau et suivre la vie du site.

J’ai rejoint l’équipe en 2022 comme Principal Product Designer pour mener la refonte avec deux Product Owners, trois développeurs front-end et un Scrum Master. J’encadrais également un designer en alternance.

## Un produit devenu fragmenté

WorkplaceToBe s’était construit par ajouts successifs. Au fil du temps, les interfaces avaient accumulé des composants, des comportements et parfois des technologies différentes.

Le problème n’était donc pas seulement visuel : sans socle commun, chaque nouvelle fonctionnalité ou nouvelle surface renforçait la fragmentation.

J’ai proposé de commencer **par un design system partagé, avec le soutien des développeurs front-end**.

```figure
type: schema
legende: "Fig. 01 · D’ajouts juxtaposés à un socle commun : avant, chaque surface apporte ses composants ; après, quatre niveaux partagés."
blocs:
  - colonnes:
      - intitule: "Avant"
        note: "Chaque ajout apporte ses propres composants."
        blocs:
          - surfaces: ["Web", "Mobile", "Outlook"]
      - intitule: "Après"
        note: "Les patterns portent l’unité, les bibliothèques les écarts."
        blocs:
          - bibliotheques:
              - { surtitre: "Bibliothèque", nom: "Web et mobile" }
              - { surtitre: "Bibliothèque", nom: "Outlook" }
              - { surtitre: "Bibliothèque", nom: "Écrans et étiquettes" }
          - couches:
              - { nom: "Patterns", detail: "réserver, déclarer sa présence", emphase: true }
              - { nom: "Composants", detail: "boutons, champs, icônes" }
              - { nom: "Tokens", detail: "couleurs, typographie, espacements" }
```

## Repartir des usages

Plutôt que de traiter chaque interface séparément, nous avons repris les principaux usages du produit :

- **Réservation** : salle, poste de travail, parking, vélo ou casier.
- **Présence** : déclarer ses jours au bureau et voir où est son équipe.
- **Actualités** : suivre la vie du site.
- **Événements** : voir ce qui se passe sur place.

Cette lecture permettait de considérer Outlook, les écrans de salle ou les DeskTags non comme des produits autonomes, mais comme **des points d’accès spécialisés à WorkplaceToBe**.

## Des objets communs

Le modèle de données existait déjà côté back-end. Mon travail a consisté à identifier les objets réellement manipulés par les utilisateurs et à leur donner une représentation cohérente dans l’interface.

Une réservation, un espace ou une présence devaient conserver le même sens, le même vocabulaire et les mêmes informations essentielles, quelle que soit la surface.

```figure
type: schema
legende: "Fig. 02 · Les objets tels que l’interface les présente, lus comme des phrases : l’espace revient dans la plupart des usages."
fond: false
blocs:
  - alignee: true
    chaine:
      - { objet: "Site", description: "un bâtiment" }
      - { liaison: "contient" }
      - { objet: "Étage", description: "ses zones, son plan" }
      - { liaison: "contient" }
      - { objet: "Espace", description: "salle, poste, parking, vélo, casier", emphase: true }
  - alignee: true
    chaine:
      - { objet: "Personne", description: "un collaborateur" }
      - { liaison: "fait" }
      - { objet: "Réservation", description: "un espace, un créneau, une personne" }
      - { liaison: "porte sur" }
      - { objet: "Espace", description: "salle, poste, parking, vélo, casier", emphase: true }
  - alignee: true
    chaine:
      - { objet: "Personne", description: "un collaborateur" }
      - { liaison: "déclare" }
      - { objet: "Présence", description: "au bureau, en télétravail, absent" }
  - alignee: true
    chaine:
      - { objet: "Équipe", description: "qui est au bureau" }
      - { liaison: "regroupe" }
      - { objet: "Personne", description: "un collaborateur" }
  - alignee: true
    chaine:
      - { objet: "Site", description: "un bâtiment" }
      - { liaison: "publie" }
      - { objet: "Actualité", description: "et événement, par site" }
```

## Un usage, plusieurs contextes

Le web et le mobile constituaient le socle du produit. Les autres surfaces ne reprenaient que les usages pertinents dans leur contexte.

```figure
type: schema
legende: "Fig. 03 · Un usage, plusieurs contextes : chaque usage n’apparaît que sur les surfaces où il a du sens."
blocs:
  - usages:
      lignes:
        - usage: "Réserver une salle"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook", note: "depuis l’invitation" }
            - { texte: "RoomPad", note: "devant la salle" }
            - { texte: "BoxPad" }
        - usage: "Réserver un poste"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
            - { texte: "DeskTag", note: "occupation", ton: contour }
        - usage: "Parking, vélo, casier"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
        - usage: "Déclarer sa présence"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
        - usage: "Voir son équipe"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
            - { texte: "Outlook" }
        - usage: "Actualités"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
        - usage: "Événements"
          surfaces:
            - { texte: "Web" }
            - { texte: "Mobile" }
      legende:
        - { texte: "usage complet" }
        - { texte: "information seule", ton: contour }
      note: "Une surface absente de la ligne ne propose pas cet usage."
```

Une fonctionnalité n’était donc pas dupliquée partout par principe. Elle n’apparaissait que là où elle avait du sens : réserver depuis Outlook, agir directement devant une salle ou afficher l’occupant d’un poste.

## Ce qui reste commun, ce qui change

Le design system partageait des **tokens** — les valeurs nommées de couleur, d’espacement ou de typographie —, des composants et des patterns d’interaction. Ce socle se déclinait dans des bibliothèques propres à chaque surface.

Trois règles guidaient les déclinaisons :

1. **Les objets et le vocabulaire restent les mêmes.**
2. **L’interaction s’adapte au contexte et à la densité disponible.**
3. **Une nouvelle surface expose des usages existants ; elle ne recrée pas le produit.**

Nous avons identifié les usages communs, puis retenu pour chaque surface ceux qui étaient pertinents dans son contexte. Réserver une salle depuis une invitation Outlook et le faire sur un RoomPad devant la porte relèvent du même usage, mais de situations différentes. L’écran de salle n’avait pas vocation à reprendre toutes les fonctions de préparation de la journée disponibles sur le web.

## Résultat et portée

Le nouvel accueil web réunissait les principaux usages autour de la journée du collaborateur : ses réservations, la présence de son équipe, les événements et les actualités du site.

![Écran d’accueil WorkplaceToBe, web et mobile](/images/workplacetobe/accueil.webp "Fig. 04 · L’accueil, sur le web et sur mobile : la journée de l’utilisateur, ses réservations, la présence de son équipe.")

![Écrans WorkplaceToBe sur place : RoomPad devant une salle, BoxPad libre et occupé, étiquettes de bureau](/images/workplacetobe/sur-place.webp "Fig. 05 · Sur place, l’interface prend la forme de l’espace : le RoomPad devant la salle, le BoxPad sur le box, l’étiquette sur le bureau.")

La refonte a établi un cadre commun pour faire évoluer les interfaces : des objets partagés, des usages identifiés et des règles de déclinaison. Ce cadre devait limiter les décisions reprises à chaque nouvelle surface. Le cas ne documente toutefois pas de mesure du temps de conception gagné ni d’évaluation comparative de l’expérience entre surfaces.

SharingCloud a été [racheté par Witco en juin 2024](https://www.witco.io/fr/blog/witco-acquiert-sharingcloud-et-renforce-son-leadership-dans-les-solutions-smart-office).

Ce travail est représentatif de ma manière d’aborder ce type de produit : **partir des usages, stabiliser les objets, puis adapter leur représentation à chaque contexte.**
