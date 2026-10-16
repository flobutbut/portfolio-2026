# Écrit 04 · L'IA, deuxième usager du produit

*Thèse : lorsqu'un agent agit au nom d'une personne, concevoir le produit implique de définir ce qu'elle peut lui déléguer, comment elle garde la main et comment elle comprend ce qui a été fait.*

---

Quand une personne manipule un produit, elle interprète ses écrans, choisit une action et en observe le résultat. Lorsqu'elle délègue cette action à un agent, une partie de ce parcours devient moins visible. Le produit doit pourtant continuer à lui permettre de comprendre et de décider.

J'appelle ici l'agent un « deuxième usager » parce qu'il accède au produit et y agit. La personne reste celle dont il sert l'intention. Ce texte est une direction de travail, pas le récit d'un dispositif que j'aurais livré.

## Distinguer construire et utiliser le produit

Un agent qui aide une équipe à construire une interface peut exploiter des composants, des patterns et leurs règles d'usage. C'est un prolongement du travail sur le design system décrit dans l'écrit 03.

Un agent qui réserve une salle ou modifie un objet agit dans le produit pour quelqu'un. Il lui faut comprendre les actions disponibles, leurs conditions, leurs effets et les limites de son autorisation. C'est cette seconde situation qui m'intéresse ici.

Les deux usages ont besoin de règles explicites, mais ils ne demandent pas les mêmes ressources ni les mêmes contrôles.

## Une intention ne définit pas toute la délégation

Imaginons une demande : « Trouve une salle pour notre réunion de mardi. » Elle ne dit pas à elle seule si l'agent doit proposer des options ou réserver, s'il peut déplacer une réservation existante, ni ce qu'il doit faire en l'absence de salle adaptée.

Le travail de conception consiste à rendre ce périmètre compréhensible. Qu'est-ce qui peut être exécuté directement ? Quel changement demande une confirmation ? Dans quel cas faut-il revenir vers la personne ?

La réponse dépend notamment des conséquences d'une erreur, de la possibilité d'annuler et des préférences exprimées. Demander une confirmation à chaque étape n'est pas une solution universelle : cela peut rendre la délégation aussi exigeante que l'action directe.

## Rendre les règles explicites, puis les faire respecter

Un agent peut inférer une règle manquante ou rechercher du contexte. Il peut aussi se tromper. L'implicite ne disparaît donc pas : il devient une source d'incertitude que la personne ne voit pas forcément.

Décrire les objets, les états, les actions et leurs effets réduit cette ambiguïté. Cela ne suffit pas à garantir une exécution correcte. Les droits et les conditions d'une action doivent aussi être contrôlés par le produit. Une instruction disant de ne pas modifier un objet ne remplace pas une permission qui l'interdit.

Cette distinction rejoint celle entre agents et parcours prédéfinis : les agents adaptent leurs actions aux informations qu'ils reçoivent, ce qui rend nécessaires des évaluations et des contrôles, au-delà de la documentation. [Building effective agents, Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

## Garder la main pendant et après l'action

La personne doit pouvoir comprendre ce qui a été fait, ce qui a échoué et ce qui reste à décider. Lorsqu'une action est réversible, le chemin pour l'annuler doit être accessible ; lorsqu'elle ne l'est pas, ses conséquences doivent être compréhensibles avant l'exécution.

Dans l'exemple de réservation, un résultat utile préciserait la salle retenue, le créneau et les éventuels écarts avec la demande. Si aucune réservation n'a été effectuée, il ne devrait pas laisser croire que la tâche est terminée.

Ces retours font partie du produit, même lorsque l'échange passe par un agent extérieur. Ils reposent sur des états et un historique suffisamment clairs pour expliquer l'action à la personne.

## Ce qu'il reste à éprouver

Je prototype avec des agents au quotidien, mais je n'ai pas encore de cas livré qui établisse l'efficacité de cette approche de la délégation. Il faudrait l'évaluer sur des situations précises : réussite de la tâche, respect des autorisations, compréhension du résultat, capacité à corriger une erreur et pertinence des confirmations.

L'absence de correction humaine ne suffirait pas à prouver la qualité du système. Une personne peut ne pas remarquer une erreur ou ne pas savoir comment intervenir.

Concevoir pour ce deuxième usager, c'est organiser une délégation que le premier peut comprendre, limiter et reprendre.

---

**Écrits liés** : 03 · Un design system qui s'arrête au bouton · 05 · Plusieurs interfaces, un même produit.
