import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  onPlay(): void {
    // Create new player
    this.player = this.gameService.newPlayer("Maher");

    // Set authentification (very basic) and navigate to game view
    if(!this.player['name']) {
      this.gameService.isAuth = true;
      this.gameService.player = this.player;
      this.router.navigate(['/', 'game']);
    }
  }

}
