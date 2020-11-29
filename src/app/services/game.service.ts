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

  public isServerOnline(){
    try {
      this.apiService.getMap().subscribe(
        (data) => {
          if(data != null) { return true; }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

  public newPlayer(name: string){
    if(!name) { return false; }
    try {
      this.apiService.postPlayer(name).subscribe(
        (data: any) => {
          if(data != null) {
            this.isAuth = true;
            return String(data.name);
          }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

  public getPlayer(name: string){
    if(!name) { return false; }
    try {
      this.apiService.getPlayer(name).subscribe(
        (data) => {
          if(data != null) {
            return data;
          }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

  public getMap(){
    try {
      this.apiService.getMap().subscribe(
        (data) => {
          if(data != null) {
            return data;
          }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

  public isPlayerDead(){
    try {
      this.apiService.getPlayer(this.player).subscribe(
        (data: any) => {
          if(data != null) {
            if(Number(data['life']) > 0) { return false; }
            return true;
          }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

}
