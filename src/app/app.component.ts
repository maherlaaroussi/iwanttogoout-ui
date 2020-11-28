import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private gameService: GameService, private router: Router) { }

  response: any;

  ngOnInit(): void {
    // If server is not online, navigate to offline page
    if(!this.gameService.isServerOnline()) { this.router.navigate(['/', 'offline']); }
  }

}
