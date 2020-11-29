import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  player: any;

  constructor(private router: Router, private gameService: GameService) { }

  async ngOnInit() {
    // If server is not online, redirect to offline page
    await this.gameService.isServerOnline().then((res) => {
      if(!res) this.router.navigate(['/', 'offline']);
    });
  }

  onPlay(namePlayer: string): void {
    // Create new player
    this.player = this.gameService.newPlayer(namePlayer);

    // Set authentification (very basic) and navigate to game view
    if(!this.player['name']) {
      this.gameService.isAuth = true;
      this.gameService.player = this.player;
      this.router.navigate(['/', 'game']);
    }
  }

}
