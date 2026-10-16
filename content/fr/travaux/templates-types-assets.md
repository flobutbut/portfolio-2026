---
# Repris de docs/Portfolio/02d_Cas_04_Templates_Qlik.md. Les « Visuel prévu » n’apparaissent qu’en aperçu tant qu’ils ne sont pas fournis.
numero: 4
slug: templates-types-assets
statut: publie
nature: note
titre: "Donner un rôle à chaque vue"
chapo: "Chez Qlik, chaque type de ressource — jeu de données, produit de données ou projet de pipeline — avait sa propre vue d’ensemble, construite au fil des besoins. Je travaille à les faire reposer sur des modèles de page communs, en donnant à chaque vue un rôle précis."
meta: "Qlik · Expérience unifiée Talend et Qlik"
strates:
  surfaces: true
  designSystem: true
  modele: false
cartouche:
  role: "Senior Product Designer"
  duree: "En cours"
  equipe: "Équipe design system, Head of Design"
  livrables: "Proposition d’architecture, modèles de page"
ecritsLies: [1, 3]
casSuivant: 1
---

J’y travaille avec l’équipe design system et le Head of Design de Qlik, dans le cadre de l’expérience unifiée entre les produits Talend et Qlik.

## Avant : une vue d’ensemble trop chargée

D’un type de ressource à l’autre, aucune vue d’ensemble ne se ressemblait dans sa structure. Chacune accumulait ce qu’on voulait montrer, sans règle commune sur la répartition de l’information entre les vues.

Deux exemples suffisent. La vue d’ensemble d’un produit de données affiche la liste complète de ses jeux de données ; celle d’un jeu de données affiche son schéma entier. Avec cinq cents colonnes ou une longue liste, la vue perd sa raison d’être : permettre d’identifier la ressource et de comprendre si elle répond au besoin avant d’en explorer le détail.

## La démarche : un rôle par vue

Plutôt que de corriger chaque page, j’ai proposé de revoir l’architecture des ressources à partir d’une règle simple : chaque vue a un rôle.

- **La vue d’ensemble permet d’identifier la ressource, d’en comprendre l’utilité et d’accéder aux actions pertinentes.**
- **Le brut et l’exhaustif vivent dans des vues dédiées** : pour un jeu de données, des vues de profil, de schéma et d’aperçu des données ; pour un produit de données, une liste de ressources filtrable.

Je propose d’inscrire cette règle dans le design system de l’expérience unifiée sous forme de modèles de page communs. Leur application doit tenir compte des informations nécessaires pour évaluer chaque type de ressource.

![Figure prévue](a-venir "une vue d’ensemble existante, puis la structure proposée — identification, informations utiles à l’évaluation, actions et accès aux vues détaillées")

## Faire adopter une architecture

Une règle de ce genre ne s’impose pas d’un coup. Le frein est simple : l’appliquer, c’est reprendre tous les types de ressources, un chantier lourd. Je propose deux façons de le rendre abordable : appliquer le modèle progressivement, un type de ressource à la fois, au fil de ses évolutions ; et passer par les templates, pour que chaque type adopte la structure commune sans être reconçu de zéro.

## État du travail et limites

Cette note décrit une proposition en cours, pas une architecture dont l’adoption serait achevée. La reprise progressive et les templates constituent le chemin d’adoption envisagé. Leur efficacité et les exceptions au modèle restent à documenter.

Une vue dédiée ne doit pas non plus rendre l’information difficile à trouver : alléger la vue d’ensemble n’a d’intérêt que si l’accès au détail reste clair.
