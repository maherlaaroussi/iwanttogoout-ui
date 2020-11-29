import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-server-offline',
  templateUrl: './server-offline.component.html',
  styleUrls: ['./server-offline.component.scss']
})
export class ServerOfflineComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  async ngOnInit() {
    // If server is online, navigate to root's app
    await this.gameService.isServerOnline().then((res) => {
      if(res) this.router.navigate(['/']);
    });
  }

}
