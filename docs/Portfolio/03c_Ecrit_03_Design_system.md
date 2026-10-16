# Écrit 03 · Un design system qui s'arrête au bouton

*Thèse : les patterns métier prolongent les composants d'un design system en organisant les interactions autour de tâches récurrentes.*

---

Quand une équipe lance un design system, elle commence presque toujours au même endroit : des couleurs, une typographie, puis des boutons, des champs, des cases à cocher, des modales. C'est utile, nécessaire même. C'est la partie la plus facilement identifiable du système. Bien la concevoir demande déjà de traiter les interactions, les états et l'accessibilité.

Souvent, le design system s'arrête là. Il reste alors à partager les décisions qui organisent les tâches à l'échelle des pages et des parcours.

## Ce que les composants ne disent pas

Un bouton organise le déclenchement d'une action. Un champ encadre la saisie et ses états. Ces composants portent des comportements essentiels, mais ne suffisent pas à organiser une tâche métier complète.

Or un produit n'est pas une collection de champs et de boutons. C'est un ensemble d'objets métier, ceux que ses utilisateurs manipulent tous les jours, et de choses qu'ils cherchent à accomplir avec eux. Si le design system ne parle que de composants génériques, chaque équipe réinvente seule la manière de présenter ces objets. Les pages se ressemblent visuellement, parce qu'elles partagent les mêmes boutons, mais elles ne se comportent pas de la même façon. La cohérence est en surface.

## Un pattern métier encode une intention

Chez Qlik, chaque type de ressource avait sa propre vue d'ensemble, construite au fil des besoins. J'ai proposé un modèle de page commun pour aider à identifier la ressource, comprendre son utilité et accéder aux actions pertinentes. Cette proposition est en cours de travail. Elle organise l'information autour d'une intention, tout en laissant à chaque type de ressource son contenu propre.

Le modèle associe une structure à cette intention. Sa réutilisation dépend de ce que les tâches ont réellement en commun ; le contenu nécessaire pour évaluer un jeu de données ne sera pas celui d'un projet de pipeline.

Chez Desoutter, on retrouvait la même logique à une autre échelle. Chaque niveau de l'installation, du contrôleur à l'outil puis au programme de vissage, suivait le même gabarit : où suis-je, dans quel état est ce que je regarde, que contient-il, que puis-je y faire. Ce gabarit n'était pas un composant. Il encodait la manière dont un technicien descend dans son installation pour comprendre et régler un problème.

Les composants stabilisent les interactions élémentaires. Les patterns métier organisent leur combinaison autour de tâches récurrentes, dans le vocabulaire du produit.

## Là où se joue la cohérence

Un produit gagne en cohérence lorsque l'utilisateur retrouve sur une nouvelle page les repères appris ailleurs. Les patterns y contribuent en traitant de manière comparable des intentions qui se répètent sur des objets différents.

Les patterns métier ont un autre effet, plus discret : ils déplacent les décisions. Sans eux, chaque nouvelle fonctionnalité oblige une équipe à se demander comment présenter son objet. Avec eux, une partie de la réponse est partagée ; l'équipe peut se concentrer sur les différences et les exceptions.

Leur conception demande un travail spécifique. Il faut comprendre le métier, repérer les intentions qui reviennent d'un objet à l'autre, et accepter qu'un pattern n'en couvre jamais tous les cas. Sans ce travail, le partage de composants laisse une partie des décisions d'usage à chaque équipe.

## Les règles qui les font tenir

Un pattern métier sans règles d'usage se dégrade vite. Chaque équipe l'adapte un peu, et en quelques versions il ne veut plus rien dire. Les règles d'usage disent quand il s'applique, quand il ne s'applique pas, et ce qu'il doit contenir. Ce ne sont pas des contraintes ajoutées après coup : c'est ce qui transmet l'intention à ceux qui n'étaient pas là quand le pattern a été conçu, équipes ou agents qui contribuent à construire les interfaces.

Une règle possible pour la vue d'ensemble serait : présenter les informations nécessaires pour identifier la ressource et décider de la suite ; donner un accès explicite aux vues exhaustives ; conserver un aperçu du détail lorsqu'il est indispensable à cette décision. Ce dernier point compte : alléger une page ne justifie pas de déplacer systématiquement toute information détaillée.

## Les limites

Un pattern métier n'a de sens que si l'intention revient vraiment. Si les situations se répètent peu, sa conception et son entretien peuvent coûter plus qu'ils ne rapportent. Et il ne s'impose pas d'un coup : sur un produit existant, l'adopter veut dire reprendre ce qui est déjà construit, objet par objet.

## Ce qui reste

Les composants partagent des interactions et des repères. Les patterns métier prolongent ce travail à l'échelle des tâches. Leur intérêt se mesure aux décisions qu'ils permettent de réutiliser sans effacer les différences utiles.

---

**Cas cités** : Note Templates (une proposition de modèle de page fondée sur une intention) · Desoutter (un gabarit par niveau d'installation).

**Écrits liés** : 02 · Le modèle avant l'écran · 04 · L'IA, deuxième usager du produit.
