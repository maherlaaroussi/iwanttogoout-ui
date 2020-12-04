<h1 align="center">I Want To Go Out - UI</h1>

<p align="center">
  <img src="src/favicon.png" alt="iwtgo-ui-logo" width="120px" height="120px"/>
  <br>
  <i>IWTGO est un jeu de labyrinthe où il faut souffrir, et même mourrir, pour sortir (ce n'est pas sûr ...).
  <br>
</p>

<p align="center">
  <a href="https://gitlab.com/maherlaaroussi/iwanttogoout"><strong>https://gitlab.com/maherlaaroussi/iwanttogoout</strong></a>
  <br>
</p>

<hr>

## Sections

- Installation
- Architecture

<hr>

## Installation

### Pré-requis

- Installation de [Node.js] contenant [Node Package Manager][npm].
- Installation d'Angular/CLI.

### Installation des dépendances
```
npm install
```

### Lancement du serveur Scala
```
sbt run
```

### Lancemznt de l'application

```
ng serve
```

## Architecture

### Composants

#### welcome
Composant principal et d'accueil de l'application. Il permet la création d'un joueur.

#### server-offline
Composant affiché lorsque le serveur scala n'est pas en ligne.

#### game
Composant principale du jeu, là où toute la logique est traitée ainsi que la vue de la map et des informations du et des joueurs.


### Routes

- `/` : vue d'accueil qui permet à l'ytilisateur de créer un joueur.
- `/offline` : vue qui est affiché lorsque le serveur scala est hors ligne.
- `/game` : vue qui affichera le jeu.


[ng]: https://angular.io
[cli]: https://cli.angular.io/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
