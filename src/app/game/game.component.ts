import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isAuth = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.isAuth = this.gameService.isAuth;
    if(!this.isAuth) { this.router.navigate(['/']); }
  }

}


