# Navigation

## Le principe

La navigation du site se conçoit comme celle d'un produit : on modélise d'abord ses objets et leurs relations, puis la navigation en découle. Les entrées principales sont les objets de premier rang ; les liens suivent les relations.

Le site a six objets : le cas, la décision, le modèle (la figure d'un cas), l'écrit, le pattern et le token. Un cas contient des décisions ; une décision peut produire un pattern ; un pattern s'appuie sur des tokens. Un écrit défend une thèse et cite des cas ; chaque cas renvoie aux écrits qui le citent. Patterns et tokens sont documentés dans l'annexe système, rattachée à l'écrit 04.

Le site devient ainsi une démonstration de plus : sa navigation applique la méthode qu'il décrit. Et l'ancien site avait déjà la bonne base technique : un registre de contenu typé, un fichier par projet, découvert automatiquement. Il suffit d'y ajouter les types Décision et Pattern.

## Le modèle d'objets du site

&#91;embedded content: modèle d'objets du site · 6 objets, l'annexe système, 2 entrées\]

Les cas et les écrits sont les deux portes d'entrée ; décisions, modèles, patterns et tokens s'atteignent en suivant les relations.

## Ce que ça donne

**Navigation principale** : Travaux, Écrits, Parcours, Contact. Deux entrées viennent du modèle (les cas, présentés sous « Travaux », et les écrits), les autres servent la candidature. Le CV passe dans la barre d'identité du hero et dans le pied de page. L'annexe système se rejoint depuis les écrits 04 et 06 et depuis le pied de page. L'entrée Parcours n'a plus de section sur l'accueil : il lui faut une page, ou elle disparaît.

**Adresses** : elles reflètent le modèle et restent stables.

| Objet | Adresse | Où il vit |
| --- | --- | --- |
| Cas | /cas/desoutter | Page de cas |
| Décision | /cas/desoutter#decision-1 | Section 4 du cas |
| Modèle | /cas/desoutter#modele | Section 3 du cas |
| Écrit | /ecrits/modele-objet | Page d'écrit, listée sur /ecrits |
| Pattern | /systeme/patterns/reservation | Fiche dans l'annexe système |
| Token | /systeme/tokens | Annexe système |

**Liens croisés, le long des relations :**

- Un écrit cite ses cas, avec un lien vers la section concernée ; chaque cas liste en pied de page les écrits qui le citent.
- Une décision qui a produit un pattern renvoie à sa fiche.
- Une fiche de pattern indique où il est né et où il a été réutilisé, avec les liens retour vers les cas.
- Chaque cas se termine sur le suivant, comme prévu dans le gabarit.

**Trois chemins de lecture** :

| Lecteur | Chemin | Temps |
| --- | --- | --- |
| Recruteur, cabinet | Landing, puis l'encadré « en trente secondes » d'un ou deux cas | 2 à 3 minutes |
| Lead design, VP Product | Un cas en entier, puis l'écrit qui le cite | 10 minutes |
| Ingénieur, ou agent | Écrit 05 ou 06, puis l'annexe système, l'export JSON et le llms.txt | Variable |

Le même modèle de contenu, exporté en JSON, est aussi ce que lit un agent : la navigation pour les humains et les données pour les machines viennent de la même source.

## Les limites

Trois cas, une dizaine de décisions et une poignée de patterns : c'est un petit système, et il faut le traiter comme tel.

- Pas de recherche, de filtres ni de vue par étiquette : ce serait de l'outillage sans contenu.
- Un lien croisé n'existe que si la relation est réelle ; aucune fiche de pattern inventée pour remplir le modèle.
- Un recruteur ne doit jamais avoir besoin de comprendre le modèle pour lire un cas. Il est là pour qui le cherche, pas imposé à tous.
- La navigation principale reste à cinq entrées au plus.
