import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  player: any;
  error: boolean;
  message: string;

  constructor(private router: Router, private gameService: GameService) {
    this.error = false;
    this.message = '';
  }

  async ngOnInit(): Promise<void> {
    this.checkServer();
  }

  private async checkServer(): Promise<void> {
    // If server is not online, redirect to offline page, check each 5s
    await this.gameService.isServerOnline().then((res) => {
      if (!res) {
        this.router.navigate(['/', 'offline']);
      } else {
        setTimeout(() => this.checkServer(), 5000);
      }
    });
  }

  async onPlay(namePlayer: string): Promise<void> {
    // Create new player
    this.player = await this.gameService.newPlayer(namePlayer);

    // Set authentification (very basic) and navigate to game view
    if (this.player) {
      this.router.navigate(['/', 'game']);
    } else if (namePlayer === '') {
      this.error = true;
      this.message = 'Nom de joueur incorrect.';
    } else {
      this.error = true;
      this.message = 'Le joueur ' + namePlayer + ' est déjà présent.';
    }
  }
}
