---
# Modèle de cas : copiez ce fichier dans content/fr/travaux/<slug>.md
# (et sa traduction dans content/en/work/<slug>.md, même numero).
# Tout texte commençant par « À compléter » s'affiche en gris en développement
# et fait échouer le build de production.
numero: 2                      # identifiant partagé entre les langues (entier unique)
slug: mon-cas                  # adresse : /travaux/mon-cas (minuscules, chiffres, tirets)
statut: brouillon              # brouillon | publie
titre: "À compléter : titre du cas"
chapo: "À compléter : deux ou trois phrases qui posent le cas."
meta: "À compléter : Entreprise · domaine"
strates:                       # les strates touchées (true / false)
  surfaces: false
  designSystem: false
  modele: true
entree:                        # facultatif : texte de la ligne dans les listes
  titre: "À compléter"
  description: "À compléter"
# visuel:                      # facultatif : image de la liste, placée dans public/ (PNG ou SVG transparent)
#   src: /images/mon-cas/apercu.png
#   alt: Description de l'image
cartouche:
  role: "À compléter"
  duree: "À compléter"
  equipe: "À compléter"
  livrables: "À compléter"
trenteSecondes:
  probleme: "À compléter"
  decision: "À compléter"
  ceQuiReste: "À compléter"
titreDecisions: "À compléter : titre de la section décisions"
decisions:
  - titre: "À compléter"
    plutotQue: "À compléter"
    parceQue: "À compléter"
    auPrixDe: "À compléter"
titreRegles: "À compléter : titre de la section règles"
regles:
  - "À compléter"
# reglesCommentaire: "Paragraphe facultatif sous les règles"
# reglesEcrit: 4               # numéro de l'écrit qui argumente ces règles
ecritsLies: []                 # numéros d'écrits, ex. [3, 4]
# casSuivant: 3                # numéro du cas suivant
---

## Le système avant

### À compléter : grand titre de la section

À compléter : paragraphes.

![À compléter : description de l'image](a-completer "Fig. 01 · Légende de la figure")

## Le modèle

### À compléter

À compléter.

::decisions

## Matérialisation

### À compléter

![Description de la capture](/images/mon-cas/ecran.png "Légende de la capture")

## Résultats et limites

### À compléter

À compléter.

:::lead
À compléter : la phrase qui résume ce qui reste du projet.
:::
