import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player-win',
  templateUrl: './player-win.component.html',
  styleUrls: ['./player-win.component.scss']
})
export class PlayerWinComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  async ngOnInit() {
    if(!this.gameService.isDead && this.gameService.isAuth) {
      setTimeout(() => {
        this.router.navigate(['/', 'game']);
      }, 6000);
    }
    else {
      this.router.navigate(['/']);
    }
  }

}
