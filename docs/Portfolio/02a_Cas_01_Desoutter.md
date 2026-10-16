# Cas 01 · Desoutter WebUI

## Une installation qu’on parcourt comme une arborescence

**Chez Desoutter, des contrôleurs pilotent des dizaines d’outils de vissage, chacun avec ses programmes. J’ai été recruté en freelance pour concevoir WebUI, une plateforme accessible depuis un navigateur, et créer son design system. Le cœur du travail : une navigation qui suit la structure de l’installation elle-même.**

WebUI est une plateforme centrale, accessible depuis un navigateur : elle réunit tous les contrôleurs d’une installation et les outils qu’ils pilotent, là où chaque ancien logiciel ne couvrait qu’une tâche. J’y ai travaillé un an, en sprints, avec deux Product Owners et trois développeurs front-end, que j’accompagnais jusqu’à l’implémentation.

### Avant : un logiciel par tâche

Chaque tâche avait son logiciel : configurer un contrôleur, analyser des courbes de vissage, collecter les résultats, gérer les droits d’accès. Un même outil ou un même programme de vissage existait dans plusieurs applications, avec des écrans et parfois un vocabulaire différents.

Réunir ces logiciels dans un seul produit, c’était faire cohabiter quatre métiers qui n’y cherchent pas la même chose : l’opérateur, la maintenance, l’ingénieur process et l’ingénieur qualité.

### Descendre dans l’installation

J’ai choisi l’installation comme structure principale de navigation plutôt qu’une entrée par fonctions — configurer, analyser, diagnostiquer. L’arborescence reproduit les relations entre les équipements. On entre par les contrôleurs ; chaque contrôleur donne accès à ses outils de vissage ; chaque outil à ses programmes.

*Visuel prévu : l’arborescence de WebUI · quatre niveaux, une même page.*

À chaque niveau, la page a la même forme : un titre, les mêmes onglets (vue d’ensemble, réglages, historique) et un fil d’Ariane pour remonter. La répétition de ces repères vise à faciliter le passage d’un niveau à l’autre.

*Visuel prévu : Vue d’ensemble : tous les contrôleurs et leur état.*

*Visuel prévu : Un contrôleur : ses outils en temps réel.*

*Visuel prévu : Un outil : ses programmes de vissage, édités en panneau latéral.*

L’état remonte dans l’arbre : un outil hors tolérance apparaît dans le compteur de son contrôleur, qui apparaît dans la vue d’ensemble. D’en haut, on voit où descendre.

Avant de dessiner une page, j’en précisais l’objectif, la navigation, les statuts, les actions et le contenu.

### Le même arbre pour quatre métiers

Quatre profils métier ont été identifiés en ateliers avec les équipes Desoutter ; trois ont été formalisés en fiches persona, l’opérateur n’ayant pas de fiche dédiée. Ce travail a permis de formuler les besoins et les risques propres à chaque profil pour concevoir leurs parcours dans une même installation :

- **Ingénieur process** : configurer et surveiller le système, appliquer une nouvelle configuration ou revenir à l’ancienne. Il redoute la double modification d’un process et l’arrêt de production.
- **Maintenance** : diagnostiquer, restaurer une configuration, gérer le parc, recalibrer. Elle redoute de ne pas savoir qui a modifié quoi.
- **Ingénieur qualité** : contrôler les machines, analyser les défauts, étalonner. Il redoute « un OK qui n’est pas OK » et la perte de traçabilité.
- **Opérateur** : configurer et contrôler les outils, suivre en temps réel, valider les séquences.

### Un programme, plusieurs niveaux d’engagement

Le programme de vissage est le nœud où ces attentes se croisent. Deux des trois fiches persona faisaient apparaître un besoin de réglages avancés et de configuration guidée. J’ai conservé les deux modes d’édition : on trouve le programme, on le consulte, puis on choisit de l’éditer directement ou pas à pas. Le guidage offre une autre manière d’aborder la configuration, sans imposer ce parcours à tous.

*Visuel prévu : le programme de vissage · liste, consultation, deux modes d’édition.*

### Plusieurs chemins, un même nœud

L’arbre donne un contexte, mais il ne doit pas imposer de parcourir tous les niveaux pour atteindre un outil connu. Le diagnostic illustre cette articulation entre navigation et recherche. Il commence quand un opérateur bloqué appelle la maintenance, dont le technicien n’est pas forcément devant la ligne. Qu’il parte de la vue d’ensemble ou d’un outil recherché par son nom ou son numéro de série, il arrive à la même page outil, d’où part le chemin de vérification.

*Visuel prévu : Parcours de diagnostic : depuis WebUI, ou depuis l’outil avec une recherche.*

### Ce qui reste commun, ce qui change

Le design system, que j’ai créé pour WebUI, servait directement cette navigation. Deux règles guidaient les déclinaisons :

1. **Chaque niveau de l’arborescence suit le même gabarit.**
2. **Les états sont les mêmes partout et remontent d’un niveau à l’autre.**

Le gabarit regroupait un titre, des onglets et un fil d’Ariane ; les états permettaient de signaler un problème à plusieurs niveaux de l’installation. L’équipe pouvait réutiliser ces repères, puis concevoir le contenu et les actions propres à chaque page.

*Visuel prévu : Extrait du design system WebUI.*

### Ce qui a été transmis à l’équipe

WebUI visait à réunir la configuration, l’analyse des courbes, la collecte des résultats et la gestion des droits. À la fin de ma mission, l’arborescence, le gabarit de page et le design system étaient posés, et l’équipe front-end construisait les nouvelles pages à partir d’eux, sans repasser par une conception écran par écran.

Ce résultat porte sur la structure du produit et sa réutilisation par l’équipe. Il ne suffit pas à établir un gain de temps en diagnostic ou une réduction de l’apprentissage, qui ne sont pas documentés ici.

Le choix structurant reste **une navigation fondée sur l’installation, complétée par la recherche pour atteindre directement un équipement**.

À lire aussi : écrit 02 · Le modèle avant l'écran · écrit 03 · Un design system qui s'arrête au bouton. Cas suivant : 02 · WorkplaceToBe.

---

Sources consultées (à ne pas publier) : [gamme logicielle Desoutter](https://desouttertools.com/en-gb/products/series/32052), [CVI Net WEB](https://webshop.desouttertools.com/products/CVINet-Web/CVI-Net-WEB-sku15175-cat31014.32055), [CVI ANALYZER](https://www.desouttertools.com/en/p/cvi-analyzer-15170).
