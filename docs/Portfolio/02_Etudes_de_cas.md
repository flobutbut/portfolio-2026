# Études de cas

## Rôle et choix des cas

Les études de cas montrent comment les choix de conception répondent à des problèmes concrets. La collection comprend trois cas principaux et une note de conception en cours. Chaque texte distingue ce qui a été proposé, réalisé et observé.

| Cas | Problème de système | Ce qu'il prouve | Matière dans l'ancien site |
| --- | --- | --- | --- |
| 01 · Desoutter | Des logiciels métiers cloisonnés à réunir en une plateforme | Navigation fondée sur l'installation, accès direct par recherche, gabarit réutilisé par l'équipe | Riche : contexte, quatre profils, méthode, design system |
| 02 · WorkplaceToBe | Des usages à adapter au web, au mobile et aux équipements sur site | Objets communs, sélection des usages selon le contexte, bibliothèques par surface | Riche, mais rangée dans la page Expérience SharingCloud |
| 03 · Data contracts (Qlik) | Des engagements à formaliser entre producteurs et consommateurs de données | Démarche en cours : relier les engagements aux mesures existantes et distinguer déclaration et contrôle | Cas rédigé, travail en cours |

Le Cèdre (modélisation objet), MAIF (recherche terrain) et JP Racing (configurateur à règles) restent visibles, en fiches courtes sur la page À propos. OneTouch Hospitality sort du site.

La note 04, Templates des types d'assets (Qlik), complète les cas : elle décrit une proposition de répartition de l'information entre les vues et un chemin d'adoption envisagé. Elle ne présente pas de résultat de déploiement.

## Gabarit commun d'une page de cas

Le gabarit sert de repère, sans imposer les mêmes titres ni le même récit à chaque projet. Le lecteur doit pouvoir identifier rapidement le problème, la décision principale et le statut du résultat. Les figures et les écrans apparaissent à l'endroit où ils soutiennent l'explication.

**Principe d'écriture.** Le lecteur doit comprendre la démarche et son intérêt, pas la mécanique du produit. Chaque section part d'un problème rencontré, montre la démarche qui y répond et dit pourquoi elle compte. Les termes métier sont expliqués à leur première mention. Un détail technique est conservé lorsqu'il permet de comprendre un arbitrage ; les inventaires de fonctionnalités et de paramètres restent hors du récit.

| # | Section | Niveau | Contenu | Longueur |
| --- | --- | --- | --- | --- |
| 0 | En-tête | Numéro de cas en Doto, H1 Datatype | Titre = le problème de système ; cartouche : contexte, rôle, période, équipe, livrables | 1 écran |
| 1 | En trente secondes | Encadré | Le problème, la décision structurante, ce qui est réalisé ou encore en cours | 3 phrases |
| 2 | Le système avant | H2 + texte | Ce qui ne tenait plus, avec un schéma de l'existant si possible | 1 paragraphe + 1 figure |
| 3 | Le modèle | H2 + figure principale | Objets, relations, états ou rôles nécessaires pour comprendre le choix, sans confondre modèle métier et gabarit de page | 1 figure + légende |
| 4 | Décisions et arbitrages | H2 + liste numérotée | Trois décisions maximum, chacune avec l'alternative écartée ; ce qu'elle a coûté, seulement si ça éclaire la démarche | 3 blocs courts |
| 4 bis | Ce que le système a retenu | H2 + fiches de pattern | Section facultative : règles ou patterns réutilisables, leurs conditions d'usage et leur adoption effective ou envisagée | 1 à 2 fiches |
| 5 | Matérialisation | H2 + écrans | Les écrans qui montrent le modèle en action, annotés | 2 à 4 visuels |
| 6 | Résultats et limites | H2 + texte | Ce qui est livré, adopté ou observé, sans indicateur inventé ; distinguer les intentions des effets établis et préciser ce qui reste ouvert | 1 paragraphe |
| 7 | Cas suivant | Lien | Les écrits qui citent ce cas, puis le cas suivant et le retour à l'index | 1 ligne |

Règle d'écriture : chaque décision se lit « j'ai choisi X plutôt que Y, parce que Z ». Le coût (« au prix de W ») s'ajoute quand il éclaire la démarche et se dit sans jargon.

Le fil rouge des cas : relier un choix de structure à une situation d'usage. Desoutter porte sur le repérage et le diagnostic ; WorkplaceToBe, sur l'adaptation aux surfaces ; Data contracts, sur la formalisation des engagements. La réutilisation est développée lorsqu'elle est documentée.

Pour chaque cas, préciser l'origine des besoins : ateliers internes, recherche terrain ou autre source effectivement disponible. Ne pas présenter une hypothèse issue d'un atelier comme un résultat de test utilisateur.

Un cas expose une situation et une décision ; l'écrit développe leur portée générale. Les renvois suivent les sujets réellement traités : écrit 02 pour le modèle, 03 pour les patterns, 04 pour la délégation aux agents, 05 pour les interfaces multiples. Ne pas faire passer une démarche en cours pour une preuve d'impact.

## Page index Études de cas

Une page courte, atteinte depuis la navigation, qui reprend la planche 02 de la landing en plus développé : on y choisit un cas en voyant déjà son modèle.

1. En-tête : numéro « 02 » en Doto, H1 « Trois cas, trois problèmes de structure », la phrase d'intro de la landing.
2. Trois rangées pleine largeur, une par cas (Cas/Carte, disposition Horizontale) : la figure du modèle sur sept colonnes à gauche, la légende sur cinq colonnes à droite (contexte, titre, décision, étiquettes, « Lire le cas → »).
3. Une entrée complémentaire « Note de conception en cours » vers Templates Qlik, puis une ligne « Autres projets » : Le Cèdre, MAIF, JP Racing, avec lien vers la page À propos.
4. Contact et pied de page, identiques à la landing.
