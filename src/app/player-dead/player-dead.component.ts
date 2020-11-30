import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player-dead',
  templateUrl: './player-dead.component.html',
  styleUrls: ['./player-dead.component.scss']
})
export class PlayerDeadComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  async ngOnInit() {
    if(this.gameService.isDead && this.gameService.isAuth) {
      setTimeout(() => {
        this.gameService.restart();
        this.router.navigate(['/']);
      }, 6000);
    }
    else {
      this.router.navigate(['/']);
    }
  }

}
