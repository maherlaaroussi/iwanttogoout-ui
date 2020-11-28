import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  players: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPlayers().subscribe((data)=>{
      console.log(data);
      this.players = data;
    });
  }

}


