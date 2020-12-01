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
  mapScreen: Boolean[][];

  showButtons = true;
  buttons: Directions = {
    nord: true,
    sud: true,
    ouest: true,
    est: true
  }

  player = {
    name: '',
    life: 0,
    position: ''
  };
  map = {
    monsters: 0,
    size: 0,
    players: 0,
    dead_players: 0
  };

  constructor(private gameService: GameService, private router: Router) {
    this.syncDataLoop();
    this.showButtons = true;
    this.mapScreen = [];
    this.resetMapScreen(false);
   }

   private resetMapScreen(state: boolean) {
    for(var i: number = 0; i < 5; i++) {
      this.mapScreen[i] = [];
      for(var j: number = 0; j< 5; j++) {
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
    // TODO: Calcul d'une formule pour obtenir la bonne position
  }

  async ngOnInit() {
    this.isAuth = this.gameService.isAuth;
    if(!this.isAuth) {
      this.router.navigate(['/']);
    }
    else {
      this.syncData();
    }
    this.setPosition(this.player['position']);
  }

  async syncData() {
    await this.gameService.syncData().then((res) => { });
    this.player = this.gameService.player;
    this.map = this.gameService.map;
    this.setPosition(this.player['position']);
  }

  private setButtons(state: boolean) {
    this.buttons = {
      nord: state,
      sud: state,
      ouest: state,
      est: state
    };
  }

  private stuck() {
    this.message = 'Vous êtes bloqué ...';
    this.showButtons = false;
  }

  private win() {
    this.message = 'Vous avez trouvé la sortie ! ...';
    this.showButtons = false;
    setTimeout(() => {
      this.message = 'Une nouvelle partie commencera dans 6 secondes.';
      this.router.navigate(['/game']);
    }, 6);
  }

  private dead() {
    this.message = 'Vous êtes mort inutilement ...';
    this.showButtons = false;
    setTimeout(() => {
      this.gameService.playerDead();
    }, 1500);
  }

  private showMessage(message: string, reset: boolean = false) {
    let saveButtons = this.buttons;
    this.setButtons(false);
    this.message = message;
    setTimeout(() => {
        this.message = '';
        this.buttons = saveButtons;
        if(reset) {
          this.setButtons(true);
        }
    }, 1500);
  }

  async onMove(direction: string) {

    // If player is stuck
    let stuck = false;
    stuck = Object.values(this.buttons).every(b => stuck = !(stuck || Boolean(b)));
    if(stuck) {
      this.stuck();
      return;
    }

    await this.gameService.movePlayer(this.player['name'], direction).then((res) => {
      // Player changed position
      if(res['position'] != this.player['position']) {
        this.showMessage('Déplacement : ' + direction.toUpperCase(), true);
        // Player have more life than before, so he found the exit
        if(Number(res['life']) > Number(this.player['life'])) {
          this.win();
        }
        else if(res['life'] != this.player['life']) {
          if(Number(res['life']) == 0) {
            this.dead();
          }
          else {
            let life_now = Number(this.player['life']) - Number(res['life'])
            this.showMessage('Vous avez subit ' + life_now + ' dégats.', true);
          }
        }
      }
      // Player not mouved
      else {
        this.buttons[direction as keyof Directions] = false;
        this.showMessage('Direction bloquée !');
      }
    });
    this.syncData();
  }

  private async syncDataLoop() {
    await this.syncData();
    setTimeout(() => this.syncDataLoop(), 5000);
  }

}


