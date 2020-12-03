import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    // If server is not online, navigate to offline page
    if (!this.gameService.isServerOnline()) {
      this.router.navigate(['/', 'offline']);
    }
  }

}
