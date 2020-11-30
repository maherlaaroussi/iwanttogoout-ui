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
   }

  async ngOnInit() {
    this.isAuth = this.gameService.isAuth;
    if(!this.isAuth) {
      this.router.navigate(['/']);
    }
    else {
      this.syncData();
    }
  }

  async syncData() {
    await this.gameService.syncData().then((res) => { });
    this.player = this.gameService.player;
    this.map = this.gameService.map;
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
          this.showMessage('Vous avez trouvé la sortie !!.');
          this.router.navigate(['/', 'win']);
        }
        if(res['life'] != this.player['life']) {
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


