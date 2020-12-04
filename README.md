<h1 align="center">I Want To Go Out - UI</h1>

<p align="center">
  <img src="src/favicon.png" alt="iwtgo-ui-logo" width="120px" height="120px"/>
  <br>
  <i>IWTGO est un jeu de labyrinthe où il faut souffrir, et même mourrir, pour sortir.
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

- Installer [Node.js] qui contient [Node Package Manager][npm].
- Installer Angular/CLI.

### Installer les dépendances
```
npm install
```

### Lancer le serveur Scala
```
sbt run
```

### Lancer l'application

```
ng serve
```

## Architecture

### Composants

#### welcome

#### server-offline

#### game


### Routes

- `/` : vue d'accueil qui permet à l'ytilisateur de créer un joueur.
- `/offline` : vue qui est affiché lorsque le serveur scala est hors ligne.
- `/game` : vue qui affichera le jeu.


[ng]: https://angular.io
[cli]: https://cli.angular.io/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
