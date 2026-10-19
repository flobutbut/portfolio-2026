---
# Repris de docs/Portfolio/02d_Cas_04_Templates_Qlik.md. Les « Visuel prévu » n’apparaissent qu’en aperçu tant qu’ils ne sont pas fournis.
numero: 4
slug: templates-types-assets
statut: publie
nature: note
titre: "Donner un rôle à chaque vue"
chapo: "Chez Qlik, chaque asset type (dataset, data product ou pipeline project) avait son propre overview, construit au fil des besoins. Je travaille à les faire reposer sur des modèles de page communs, en donnant à chaque vue un rôle précis."
meta: "Qlik · Expérience unifiée Talend et Qlik"
strates:
  surfaces: true
  designSystem: true
  modele: false
visuel:
  src: /images/templates-types-assets/apercu.svg
  alt: "Illustration isométrique : des vues empilées, construites sur un même modèle de page"
cartouche:
  role: "Senior Product Designer"
  duree: "En cours"
  equipe: "Équipe design system, Head of Design"
  livrables: "Proposition d’architecture, modèles de page"
ecritsLies: [1, 3]
casSuivant: 1
---

J’y travaille avec l’équipe design system et le Head of Design de Qlik, dans le cadre de l’expérience unifiée entre les produits Talend et Qlik.

## Avant : un overview trop chargé

D’un asset type à l’autre, aucun overview ne se ressemblait dans sa structure. Chacune accumulait ce qu’on voulait montrer, sans règle commune sur la répartition de l’information entre les vues.

Deux exemples suffisent. L’overview d’un data product affiche la liste complète de ses datasets ; celui d’un dataset affiche son schéma entier. Avec cinq cents colonnes ou une longue liste, la vue perd sa raison d’être : permettre d’identifier l’asset et de comprendre s’il répond au besoin avant d’en explorer le détail.

```figure
type: schema
legende: "Fig. 01 · Avant : l’overview d’un data product empile tous ses datasets ; celle d’un dataset, son schéma entier."
blocs:
  - colonnes:
      - intitule: "Avant"
        blocs:
          - page:
              surtitre: "Data product"
              titre: "Overview"
              blocs:
                - { bloc: "Résumé", ton: clair }
                - { bloc: "Liste complète des datasets", ton: clair, lignes: 7, suite: "… et tout le reste, sans fin" }
      - intitule: "Avant"
        blocs:
          - page:
              surtitre: "Dataset"
              titre: "Overview"
              blocs:
                - { bloc: "Résumé", ton: clair }
                - { bloc: "Schéma complet · 500 colonnes", ton: clair, lignes: 7, suite: "… et tout le reste, sans fin" }
```

## La démarche : un rôle par vue

Plutôt que de corriger chaque page, j’ai proposé de revoir l’architecture des assets à partir d’une règle simple : chaque vue a un rôle.

- **L’overview permet d’identifier l’asset, d’en comprendre l’utilité et d’accéder aux actions pertinentes.**
- **Le brut et l’exhaustif vivent dans des vues dédiées** : pour un dataset, des vues de profil, de schéma et d’aperçu des données ; pour un data product, une liste d’assets filtrable.

Je propose d’inscrire cette règle dans le design system de l’expérience unifiée sous forme de modèles de page communs. Leur application doit tenir compte des informations nécessaires pour évaluer chaque asset type.

```figure
type: schema
legende: "Fig. 02 · Après : l’overview résume, montre la valeur et invite à agir ; le détail vit dans des vues dédiées, à un clic."
blocs:
  - chaine:
      - intitule: "Après"
        groupe:
          - page:
              surtitre: "Dataset ou data product"
              titre: "Overview"
              blocs:
                - { bloc: "Résumer" }
                - { bloc: "Montrer la valeur" }
                - { bloc: "Inviter à agir", ton: bleu }
      - { liaison: "voir le détail" }
      - groupe:
          - objets:
              - { objet: "Profil, schéma, aperçu", description: "dataset · les cinq cents colonnes, à leur place" }
              - { objet: "Ressources filtrables", description: "data product · la liste complète, filtrable par dataset" }
```

## Faire adopter une architecture

Une règle de ce genre ne s’impose pas d’un coup. Le frein est simple : l’appliquer, c’est reprendre tous les asset types, un chantier lourd. Je propose deux façons de le rendre abordable : appliquer le modèle progressivement, un asset type à la fois, au fil de ses évolutions ; et passer par les templates, pour que chaque type adopte la structure commune sans être reconçu de zéro.

## État du travail et limites

Cette note décrit une proposition en cours, pas une architecture dont l’adoption serait achevée. La reprise progressive et les templates constituent le chemin d’adoption envisagé. Leur efficacité et les exceptions au modèle restent à documenter.

Une vue dédiée ne doit pas non plus rendre l’information difficile à trouver : alléger l’overview n’a d’intérêt que si l’accès au détail reste clair.
