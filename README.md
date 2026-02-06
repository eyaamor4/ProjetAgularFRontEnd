# Application de Gestion d'un Laboratoire de Recherche

## Description

Ce projet consiste en une application Web permettant la gestion d'un laboratoire de recherche. L'objectif est de gérer les membres, publications, événements, outils développés, et autres aspects liés à un laboratoire de recherche. Les membres peuvent être des étudiants ou des enseignants-chercheurs, et chaque membre peut contribuer au laboratoire de différentes manières : en publiant des articles, en développant des outils open source, et en participant à des événements.

L'application permet également aux visiteurs de consulter les membres du laboratoire, leurs publications, télécharger des outils, et rechercher des publications ou membres selon divers critères.

### Architecture du projet

Le projet est composé de plusieurs services interconnectés :

- **Membre-service** : Gère les informations des membres (étudiants et enseignants chercheurs).
- **Publication-service** : Gère les publications de recherche.
- **Evènement-service** : Gère les événements organisés par le laboratoire.
- **Outil-service** : Gère les outils développés et rendus open-source.

Les utilisateurs peuvent interagir avec ces services pour gérer leurs informations personnelles, publications, événements auxquels ils participent, et bien plus.

## Fonctionnalités

- **Membres** : Ajouter, gérer et consulter les membres (étudiants et enseignants chercheurs).
- **Publications** : Ajouter et consulter les publications scientifiques (articles de journaux, chapitres de livres, etc.).
- **Outils** : Télécharger des outils développés au sein du laboratoire.
- **Evénements** : Consulter et participer à des événements organisés par le laboratoire.
- **Recherches avancées** : Effectuer des recherches par type de publication, année, grade des membres, etc.
- **Gestion des profils** : Modifier ses informations personnelles, publications, outils, événements, et encadrements.

## Installation

### Prérequis

- **Node.js** (version 12.x ou supérieure)
- **Angular CLI** (version 11.x ou supérieure)

### Installation des dépendances

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/eyaamor4/ProjetAgularFRontEnd.git
   cd ProjetAgularFRontEnd
npm install
ng serve


### Explication des sections :

1. **Description** : Présente brièvement l'application et son but (gestion d'un laboratoire de recherche).
2. **Fonctionnalités** : Décrit les fonctionnalités principales du projet, en s'appuyant sur le texte fourni dans le fichier PDF.
3. **Installation** : Explique les étapes d'installation nécessaires pour exécuter l'application localement.
4. **Démarrer l'application** : Donne les instructions pour démarrer l'application sur la machine locale.
5. **Diagramme de Classe** : Cette section peut inclure un lien vers le diagramme de classes de votre application (ajoutez le lien vers l'image du diagramme ou une description plus détaillée si nécessaire).
6. **Contribuer** : Indique comment les autres peuvent contribuer au projet.
7. **Auteurs** et **Licence** : Mentionne les auteurs du projet et la licence sous laquelle le code est partagé.

### Ajouter le Diagramme à votre README :

1. Si vous avez un lien direct vers l'image du diagramme (par exemple, si elle est stockée dans le dépôt ou sur un autre service), vous pouvez ajouter le lien dans la section **Diagramme de Classe**.
2. Si l'image est sur votre machine, vous pouvez la télécharger dans votre dépôt GitHub et utiliser ce lien pour l'ajouter au README.

Cela vous donnera un bon point de départ pour documenter votre projet ! Si vous avez d'autres détails à ajouter ou des questions, n'hésitez pas à demander.
