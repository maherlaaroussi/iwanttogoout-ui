import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../services/game.service';

interface Directions {
  nord: boolean,
  sud: boolean,
  ouest: boolean,
  est: boolean
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  isAuth = false;
  message = '';
  mapScreen: Boolean[][] = [];
  updateInformations = true;
  stopLoop = false;

  showButtons = true;
  buttons: Directions = {
    nord: true,
    sud: true,
    ouest: true,
    est: true
  }

  showPlayers = false;
  players = [];

  player = {
    name: '',
    life: 0,
    position: ''
  };

  showMap = true;
  map = {
    monsters: 0,
    size: 0,
    players: 0,
    dead_players: 0
  };

  constructor(private gameService: GameService, private router: Router) { }

   async ngOnInit() {
    this.isAuth = this.gameService.isAuth;
    if(!this.isAuth) {
      this.router.navigate(['/']);
    }
    else {
      await this.syncData();
      this.resetMapScreen(false);
      this.setPosition(this.player['position']);
    }
    this.syncDataLoop();
    this.checkServer();
    this.checkAuth();
    this.showButtons = true;
  }

  async ngOnDestroy() {
    this.stopLoop = true;
  }

   private resetMapScreen(state: boolean) {
     let taille = 6;
    for(var i: number = 0; i < taille; i++) {
      this.mapScreen[i] = [];
      for(var j: number = 0; j < taille; j++) {
          this.mapScreen[i][j] = state;
      }
    }
   }

  private setPosition(positionString: string) {
    this.resetMapScreen(false);
    let positionFormated = positionString.replace('(', '').replace(')', '').split(',');
    this.mapScreen[Number(positionFormated[0])][Number(positionFormated[1])] = true;
   }

  private getRightPosition(positionString: string) {
    let positionFormated = positionString.replace('(', '').replace(')', '').split(',');
    let x = positionFormated[0];
    let y = positionFormated[1];
  }

  async syncData() {
    // There is two checks because the request may take some times
    if(this.updateInformations) {
      await this.gameService.syncData().then((res) => { });
      if(this.updateInformations) {
        this.player = this.gameService.player;
        this.map = this.gameService.map;
        this.setPosition(this.player['position']);
      }
    }
    await this.gameService.getPlayers().then((res) => { this.players = res['joueurs']; });
  }

  private setButtons(state: boolean) {
    this.buttons = {
      nord: state,
      sud: state,
      ouest: state,
      est: state
    };
  }

  async onShowPlayers() {
    this.showPlayers = !this.showPlayers;
  }

  private stuck() {
    this.message = 'Vous êtes bloqué ...';
    this.showButtons = false;
  }

  private async win() {
    this.updateInformations = false;
    this.showMap = false;
    this.showButtons = false;
    //this.showMessage('Vous avez trouvé la sortie !', false);
    this.showMessage('Vous avez trouvé la sortie !', false, 6000);
    setTimeout(() => {
      this.showButtons = true;
      this.updateInformations = true;
      this.showMap = true;
    }, 6000);
  }

  private dead() {
    this.updateInformations = false;
    this.showMap = false;
    this.message = 'Vous êtes mort inutilement ...';
    this.showButtons = false;
    setTimeout(() => {
      this.gameService.playerDead();
    }, 1500);
    this.updateInformations = true;
  }

  private directionBlocked(direction: string) {
    this.buttons[direction as keyof Directions] = false;
    let isStuck = true;
    for(var e in this.buttons) {
      if(this.buttons[e as keyof Directions]) {
        isStuck = false;
      }
    }
    if(isStuck) {
      this.stuck();
    }
    else {
      this.showMessage('Direction bloquée !');
    }
  }

  private showMessage(message: string, reset: boolean = false, time: number = 800) {
    let saveButtons = this.buttons;
    this.setButtons(false);
    this.message = message;
    setTimeout(() => {
        this.message = '';
        this.buttons = saveButtons;
        if(reset) {
          this.setButtons(true);
        }
    }, time);
  }

  async onGiveUp() {
    this.gameService.signOut();
    this.router.navigate(['/']);
  }

  async onMove(direction: string) {
    this.updateInformations = false;

    // If player is stuck
    let stuck = false;
    stuck = Object.values(this.buttons).every(b => stuck = !(stuck || Boolean(b)));
    if(stuck) {
      this.stuck();
      return;
    }

    await this.gameService.movePlayer(this.player['name'], direction).then((res) => {

      // Player win
      if(res['position'] == "Freedom") {
        // FIXME: Quand le joueur trouvve la sortie, il ne se passe rien ou cela se passe trop vite
        this.win();
      }
      // Player changed position
      else if(res['position'] != this.player['position']) {
        // 666 is wath server return if player is dead
        if(Number(res['life']) == 666) {
          this.dead();
        }
        // If monster hit the player
        else if(Number(res['life']) < Number(this.player['life'])) {
          let life_now = Number(this.player['life']) - Number(res['life'])
          this.showMessage('Vous avez subit ' + life_now + ' dégats.', true);
        }
        // If nothing hapened
        else if(Number(res['life']) == Number(this.player['life'])) {
          this.showMessage('Déplacement : ' + direction.toUpperCase(), true);
        }
      }
      // Direction us blocked
      else {
        this.directionBlocked(direction);
      }
    });
    this.updateInformations = true;
    this.syncData();
  }

  private async syncDataLoop() {
    if(!this.stopLoop)
    {
      await this.syncData();
      setTimeout(() => this.syncDataLoop(), 5000);
    }
  }

  private async checkServer() {
    if(!this.stopLoop)
    {
      // If server is not online, redirect to offline page, check each 5s
      await this.gameService.isServerOnline().then((res) => {
        if(!res) this.router.navigate(['/', 'offline']);
        else setTimeout(() => this.checkServer(), 5000);
      });
    }
  }

  private async checkAuth() {
    if(!this.stopLoop)
    {
      if(!this.gameService.isAuth) this.router.navigate(['/']);
      else setTimeout(() => this.checkAuth(), 5000);
    }
  }

}


