import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  playerName = "";
  isServerOnline = false;
  isAuth = false;
  players: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    try {
      this.apiService.getPlayers().subscribe(
        (data) => {
          console.log(data);
          this.players = data;
          this.isServerOnline = true;
      });
    } catch (error) {
      this.isServerOnline = false;
    }
  }

}
