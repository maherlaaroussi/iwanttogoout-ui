import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  playerName = "";
  isServerOnline = false;
  isAuth = false;

  constructor(private gameService: GameService) { }

  response: any;

  ngOnInit(): void {
    if(!this.gameService.isServerOnline()) { }
  }

}
