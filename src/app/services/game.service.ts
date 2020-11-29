import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isAuth = false;
  isDead = false;
  player = '';

  constructor(private apiService: ApiService) { }

  public async isServerOnline() {
    let res = await this.apiService.getMap().catch((res) => { return false; });
    if(res) return true;
    else return false;
  }

  public async newPlayer(name: string) {
    if(!name) { return false; }
    let res: any = await this.apiService.postPlayer(name).catch((res) => { return false; });
    if(res) {
      this.isAuth = true;
      return res['name'];
    }
    else {
      this.isAuth = false;
      return false;
    }
  }

  public async getPlayer(name: string) {
    if(!name) { return false; }
    let res: any = await this.apiService.getPlayer(name).catch((res) => { return false; });
    if(res) {
      return res;
    }
    else return false;
  }

  public async getMap() {
    let res: any = await this.apiService.getPlayer(name).catch((res) => { return false; });
    if(res) {
      return res;
    }
    else return false;
  }

  public async isPlayerDead() {
    let res: any = await this.apiService.getPlayer(name).catch((res) => { return false; });
    if(Number(res['life']) > 0) {
      return false;
    }
    else return true;
  }

  public signOut() {
    this.isAuth = false;
  }

  public signIn(name: string) {
    this.isAuth = true;
    this.player = name;
  }

}
