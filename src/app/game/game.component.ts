import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

interface Directions {
  nord: boolean;
  sud: boolean;
  ouest: boolean;
  est: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy {
  isAuth = false;
  message = '';
  mapScreen: boolean[][] = [];
  updateInformations = true;
  stopLoop = false;

  showButtons = true;
  buttons: Directions = {
    nord: true,
    sud: true,
    ouest: true,
    est: true,
  };

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

   async ngOnInit(): Promise<void> {
    this.isAuth = this.gameService.isAuth;
    if (!this.isAuth) {
      this.router.navigate(['/']);
    }
    else {
      await this.syncData();
      this.resetMapScreen(false);
      this.setPosition(this.player.position);
    }
    this.syncDataLoop();
    this.checkServer();
    this.checkAuth();
    this.showButtons = true;
  }

  async ngOnDestroy(): Promise<void> {
    this.stopLoop = true;
  }

   private resetMapScreen(state: boolean): void {
    const taille = 6;
    for (let i = 0; i < taille; i++) {
      this.mapScreen[i] = [];
      for (let j = 0; j < taille; j++) {
          this.mapScreen[i][j] = state;
      }
    }
   }

  private setPosition(positionString: string): void {
    this.resetMapScreen(false);
    const positionFormated = positionString.replace('(', '').replace(')', '').split(',');
    this.mapScreen[Number(positionFormated[0])][Number(positionFormated[1])] = true;
   }

  async syncData(): Promise<void> {
    // There is two checks because the request may take some times
    if (this.updateInformations) {
      await this.gameService.syncData().then((res) => { });
      if (this.updateInformations) {
        this.player = this.gameService.player;
        this.map = this.gameService.map;
        this.setPosition(this.player.position);
      }
    }
    await this.gameService.getPlayers().then((res) => { this.players = res.joueurs; });
  }

  private setButtons(state: boolean): void {
    this.buttons = {
      nord: state,
      sud: state,
      ouest: state,
      est: state
    };
  }

  async onShowPlayers(): Promise<void> {
    this.showPlayers = !this.showPlayers;
  }

  private stuck(): void {
    this.message = 'Vous êtes bloqué ...';
    this.showButtons = false;
  }

  private win(): void {
    this.updateInformations = false;
    this.showMap = false;
    this.showButtons = false;
    this.showMessage('Vous avez trouvé la sortie !', false, 6000);
    setTimeout(() => {
      this.showButtons = true;
      this.updateInformations = true;
      this.showMap = true;
    }, 6000);
  }

  private dead(): void {
    this.updateInformations = false;
    this.showMap = false;
    this.message = 'Vous êtes mort inutilement ...';
    this.showButtons = false;
    setTimeout(() => {
      this.gameService.playerDead();
    }, 1500);
    this.updateInformations = true;
  }

  private directionBlocked(direction: string): void {
    this.buttons[direction as keyof Directions] = false;
    let isStuck = true;
    for (const e in this.buttons) {
      if (this.buttons[e as keyof Directions]) {
        isStuck = false;
      }
    }
    if (isStuck) {
      this.stuck();
    }
    else {
      this.showMessage('Direction bloquée !');
    }
  }

  private showMessage(message: string, reset: boolean = false, time: number = 800): void {
    const saveButtons = this.buttons;
    this.setButtons(false);
    this.message = message;
    setTimeout(() => {
        this.message = '';
        this.buttons = saveButtons;
        if (reset) {
          this.setButtons(true);
        }
    }, time);
  }

  async onGiveUp(): Promise<void> {
    this.gameService.signOut();
    this.router.navigate(['/']);
  }

  async onMove(direction: string): Promise<void> {
    this.updateInformations = false;

    // If player is stuck
    let stuck = false;
    stuck = Object.values(this.buttons).every(b => stuck = !(stuck || Boolean(b)));
    if (stuck) {
      this.stuck();
      return;
    }

    await this.gameService.movePlayer(this.player.name, direction).then((res) => {

      // Player win
      if (res.position === 'Freedom') {
        this.win();
      }
      // Player changed position
      else if (res.position !== this.player.position) {
        // 666 is wath server return if player is dead
        if (Number(res.life) === 666) {
          this.dead();
        }
        // If monster hit the player
        else if (Number(res.life) < Number(this.player.life)) {
          const lifeNow = Number(this.player.life) - Number(res.life);
          this.showMessage('Vous avez subit ' + lifeNow + ' dégats.', true);
        }
        // If nothing hapened
        else if (Number(res.life) === Number(this.player.life)) {
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

  private async syncDataLoop(): Promise<void> {
    if (!this.stopLoop)
    {
      await this.syncData();
      setTimeout(() => this.syncDataLoop(), 5000);
    }
  }

  private async checkServer(): Promise<void> {
    if (!this.stopLoop)
    {
      // If server is not online, redirect to offline page, check each 5s
      await this.gameService.isServerOnline().then((res) => {
        if (!res) { this.router.navigate(['/', 'offline']); }
        else { setTimeout(() => this.checkServer(), 5000); }
      });
    }
  }

  private async checkAuth(): Promise<void> {
    if (!this.stopLoop)
    {
      if (!this.gameService.isAuth) { this.router.navigate(['/']); }
      else { setTimeout(() => this.checkAuth(), 5000); }
    }
  }

}


