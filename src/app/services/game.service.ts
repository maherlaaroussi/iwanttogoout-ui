import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isAuth = false;
  isDead = false;
  players = '';
  player = {
    name: '',
    life: 0,
    position: ''
  };
  map = {
    monsters: 0,
    size: 0,
    players: 0,
    dead_players: 0
  };

  constructor(private apiService: ApiService) { }

  public async isServerOnline() {
    let res = await this.apiService.getMap().catch((res) => { return false; });
    if(res) {
      return true;
    }
    else {
      return false;
    }
  }

  public async newPlayer(name: string) {
    if(!name) { return false; }
    let res: any = await this.apiService.postPlayer(name).catch((res) => { return false; });
    if(res) {
      this.signIn(name);
      this.player['name'] = res['name'];
      this.player['life'] = res['life'];
      this.player['position'] = res['position'];
      return res;
    }
    else {
      this.signOut();
      return false;
    }
  }

  public async movePlayer(name: string, direction: string) {
    if(!name || !direction) { return false; }
    let res: any = await this.apiService.postPlayerMove(name, direction).catch((res) => { return false; });
    if(res) {
      this.syncData();
      return res;
    }
    else {
      return false;
    }
  }

  public async getPlayer() {
    let res: any = await this.apiService.getPlayer(this.player['name']).catch((res) => { return false; });
    if(res) {
      return res;
    }
    else {
      return false;
    }
  }

  public async getMap() {
    let res: any = await this.apiService.getMap().catch((res) => {
        return false;
      });
    if(res) {
      return res;
    }
    else {
      return false;
    }
  }

  public async getPlayers() {
    let res: any = await this.apiService.getPlayers().catch((res) => {
        return false;
      });
    if(res) {
      return res;
    }
    else {
      return false;
    }
  }

  public async isPlayerDead() {
    let res: any = await this.apiService.getPlayer(this.player['name']).catch((res) => { return false; });
    if(Number(res['life']) > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  public async syncData() {
    let p: any = await this.apiService.getPlayer(this.player['name']).catch((res) => { });
    if(p) {
      this.player['name'] = p['name'];
      this.player['life'] = p['life'];
      this.player['position'] = p['position'];
    }

    let m: any = await this.apiService.getMap().catch((res) => { });
    if(m) {
      this.map['size'] = m['taille'];
      this.map['players'] = m['joueurs'];
      this.map['dead_players'] = m['joueurs_morts'];
      this.map['monsters'] = m['monstres'];
    }

    let players: any = await this.apiService.getMap().catch((res) => { });
    if(players) {
      this.players = players['joueurs'];
    }
  }

  public signOut() {
    this.isAuth = false;
  }

  public signIn(name: string) {
    this.isAuth = true;
  }

  public playerDead() {
    this.isAuth = true;
    this.isDead = true;
  }

  public restart() {
    this.isAuth = false;
    this.isDead = false;
  }

}
