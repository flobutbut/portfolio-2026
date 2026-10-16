# Portfolio

Oct 12, 2026 · @Florian

## Objectif et publics

Le site doit prouver une seule chose : je sais rendre lisible un produit technique complexe, de sa structure jusqu'à l'interface. Il sert les candidatures senior, lead ou staff sur des produits techniques (Cycloid, Clever Cloud, Qovery, Didomi) et le brief aux cabinets. L'ancien site reste en l'état pour une éventuelle activité freelance.

| Lecteur | Ce qu'il cherche | Ce qu'il doit retenir |
| --- | --- | --- |
| VP Products, fondateur | Ce que ce designer changera dans la façon de décider | Il structure le produit avant de dessiner les écrans |
| Lead ou head of design | Le niveau réel, la méthode, la qualité d'exécution | Les modèles et les arbitrages sont montrés, pas seulement les maquettes |
| Ingénieurs (front, plateforme) | Un designer qui accélère au lieu de ralentir | Il parle leur langage : objets, états, spécifications versionnables |
| Cabinets de recrutement | Un positionnement clair à présenter | Product designer pour produits techniques complexes, 10 ans et plus |

Ce que le site n'est plus : une offre de services adressée à des clients. Il parle de ce que je fais et de comment je décide, pas de ce que je « vous propose ».

## Positionnement

La spécialisation défendable est de rendre lisibles des systèmes techniques complexes, pas « designer DevOps » : aucun projet DevOps ne peut encore l'étayer (l'écrit 05 sur les surfaces développeurs s'en approche, sous réserve d'une preuve). Elle sert Clever Cloud sans exclure Cycloid, Qovery ou Didomi.

Trois accroches à départager :

1. Je conçois la structure des produits techniques complexes : leurs objets, leurs règles et les systèmes qui les gardent cohérents quand ils grandissent.
2. Je rends lisibles des systèmes techniques complexes, pour les humains qui les pilotent et pour les agents qui agissent en leur nom.
3. Product designer pour plateformes techniques : modèles, états, règles, puis interfaces.

| On montre | On ne montre plus |
| --- | --- |
| Modèles d'objets, relations, états, règles | Des écrans isolés présentés comme le résultat |
| Les arbitrages et ce qu'ils ont coûté | Des listes de compétences et de savoir-être déclarés |
| La cohérence entre produits et surfaces (web, mobile, Outlook, CLI) | « Applications agréables visuellement » |
| Le travail avec Product et Engineering | Le discours d'offre de services (« je vous propose ») |
| Qlik : gouvernance, data contracts, convergence de gammes | Les projets hors cible en tête (e-commerce, hôtellerie) |

L'angle agentique reste une ligne d'horizon dans le texte, pas une promesse : aucun cas réalisé ne le porte encore. Il est argumenté dans l'écrit 06, présenté comme une direction.

## Architecture du site

Un site court : une page d'accueil qui pose le positionnement, trois études de cas qui le prouvent, six écrits qui l'argumentent. Tout le reste (autres projets, parcours détaillé) passe au second plan.

&#91;embedded content: plan du site · 1 accueil, 3 études de cas, 6 écrits, 1 page À propos\]

Ordre de lecture de l'accueil :

1. Hero : l'accroche, la colonne bleue, puis la barre d'identité (nom, titre, expérience, lieu ; Voir les travaux, CV).
2. Travaux : les trois cas, chacun avec les strates qu'il touche.
3. Position : la phrase-thèse et ce qu'il fait quand une machine agit pour quelqu'un.
4. Méthode : Cadrer, Modéliser, Systématiser.
5. Écrits : les écrits publiés.
6. Contact : l'adresse en grand, sur fond noir.

Les projets secondaires (Le Cèdre, MAIF) vivent sur la page À propos, sans étude complète.

## Études de cas

Trois cas, chacun choisi pour un problème de système différent ; le cas Qlik est le seul à écrire entièrement, les deux autres repartent de la matière de l'ancien site.

| Cas | Problème de système | Ce qu'il prouve | Matière disponible | Ce qui manque |
| --- | --- | --- | --- | --- |
| Desoutter | Unifier des logiciels métiers en une plateforme SaaS | Architecture par profils sur un socle de données commun, design system gouverné | Texte et visuels de l'ancien site | Le modèle d'objets et les profils, dessinés ; les arbitrages |
| WorkplaceToBe (SharingCloud) | Découper une offre en modules vendables, cohérents sur web, mobile et Outlook | Cohérence multi-surfaces, design system sur quatre niveaux, alignement commercial | Texte et visuels de l'ancien site | La carte des modules et des surfaces ; ce qui a été tranché avec le commercial |
| Qlik (anonymisé) | Rendre explicites responsabilités et garanties entre producteurs et consommateurs de données | Gouvernance, data contracts, convergence Talend–Qlik | Aucune publiée | Tout : à écrire en montrant le raisonnement, sans écrans confidentiels |

Format commun à chaque cas :

1. Le contexte et les contraintes, en trois phrases.
2. Le système avant : ce qui ne tenait plus.
3. Le modèle : objets, relations, états, règles, en schéma.
4. Les décisions et leurs arbitrages, avec ce qu'elles ont coûté.
5. La matérialisation : les écrans, en dernier, comme conséquence du modèle.
6. Les résultats et les limites, sans indicateur inventé.

- [ ] Valider le choix des trois cas (Le Cèdre, très orienté modélisation objet, peut remplacer Desoutter)
- [ ] Vérifier ce que la confidentialité Qlik permet de montrer
- [ ] Rassembler pour chaque cas les livrables existants (modèles, schémas, specs)

## Textes de l'accueil

Les textes à jour sont dans l'onglet Landing ; la première version, écrite sur l'accroche 1 avec la section Savoir-faire, est retirée pour ne pas laisser deux sources.

## Direction visuelle

L'ambition visuelle doit démontrer la méthode, pas la masquer : un site remarquable par sa rigueur, avec une ou deux idées d'interaction fortes, plutôt qu'un site spectaculaire.

**Direction retenue le 15 octobre : « Strates ».** Un style suisse en noir, blanc et bleu (#1F2BE0), Archivo pour les titres et Schibsted Grotesk pour le texte, construit autour de trois strates : surfaces, design system, modèle. Elle remplace la direction « plan coté » (Datatype, Doto, orange). Détail dans l'onglet Design system.

Principes, tirés de ta citation :

- Retirer avant d'ajouter : chaque élément justifie sa présence.
- Le système s'efface tant qu'il travaille : la typographie et la grille portent l'identité, pas les effets.
- Le mouvement a un sens : il révèle une structure (un niveau de lecture, une relation), jamais seulement de la décoration.

Idées d'interaction à explorer :

- Un modèle d'objets explorable dans chaque étude de cas : on survole un objet, ses relations et ses états s'éclairent.
- Des niveaux de lecture : un cas se lit en trente secondes (le problème et la décision), puis se déplie pour qui veut le détail.
- Les schémas comme matériau principal, les écrans comme conséquence.

Base possible pour la couverture, version « plan coté » d'un système produit :

&#91;embedded content: modèle d'objets générique · 5 objets, 6 relations, 4 états\]

Chaque lien se lit comme une phrase (une organisation compte n membres) ; le survol pourrait éclairer les relations d'un objet, le glisser révéler une incohérence, par exemple un état sans sortie.

À éviter : WebGL et animations lourdes, qui coûtent en performance et contredisent le positionnement face à un public d'ingénieurs. Exception étudiée : le défilement des trois strates dans le hero. Il sert s'il ne bloque pas le défilement (une hauteur d'écran au plus, et « Voir les travaux » le court-circuite), si son état final se lit sans animation (mouvement réduit, mobile), et si le hero enseigne la légende des strates qu'on retrouve ensuite sur les cas.

- [ ] Ajouter ici les liens d'inspiration (Awwwards et autres), avec une ligne sur ce que chacun apporte
- [x] Typographie : Archivo pour les titres, Schibsted Grotesk pour le texte et l'interface (9 styles, onglet Design system)
- [x] Couleur : blanc, un seul accent bleu (#1F2BE0), noir pour l'identité ; un seul mode (onglet Design system)

## Technique

Nouveau dépôt et nouveau projet Vercel, en Vue 3 ; florianbutour.com bascule vers le nouveau site à sa mise en ligne.

| Sujet | Proposition | À trancher |
| --- | --- | --- |
| Stack | Vue 3, Vite, TypeScript, comme l'ancien site | Rendu statique (prérendu) pour que les moteurs et les aperçus de liens lisent le contenu |
| Contenu | Un fichier par étude de cas, comme le registre de l'ancien site | Markdown ou TypeScript |
| Schémas | Composant dédié pour les modèles d'objets et les diagrammes | SVG fait main, Mermaid, ou bibliothèque |
| Domaine | florianbutour.com vers le nouveau projet ; l'ancien reste sur florianboutour.vercel.app | Sous-domaine freelance plus tard |
| Langue | Français d'abord | Version anglaise : Cycloid demande un anglais courant et recrute en Europe |
| Accessibilité | WCAG AA, mouvement réduit respecté (le composable de l'ancien site est réutilisable) | — |
| Performance | Pas de dépendance lourde par défaut ; vérifier avec Lighthouse avant la mise en ligne | — |

L'ancien site rendait tout en JavaScript côté client : un outil qui lit florianbutour.com n'y voit que le titre. Le prérendu corrige ce défaut.

## Calendrier et décisions ouvertes

Le fond avant la forme : le site ne se construit qu'une fois le positionnement et les trois cas arrêtés. Cycloid fixe l'échéance, car il demande un portfolio dès la candidature ; Clever Cloud ne le verra qu'après un premier échange.

1. Positionnement et accroche arrêtés.
2. Trois études de cas rédigées, avec leurs schémas.
3. Deux écrits rédigés (03 et 06, ou 05 et 06) ; les quatre autres suivent après la mise en ligne.
4. Direction visuelle choisie à partir des inspirations.
5. Construction, puis bascule du domaine.

Décisions à prendre :

- [x] Accroche : la 2 est retenue, en place sur la landing
- [ ] Candidater chez Cycloid avec un PDF de deux ou trois cas en attendant, ou attendre le site ?
- [ ] Version anglaise dès la mise en ligne ?
- [ ] Desoutter ou Le Cèdre comme premier cas ?
- [ ] Rangée « Écrits » sur la landing, ou seulement l'entrée de navigation et les renvois de la méthode ?
