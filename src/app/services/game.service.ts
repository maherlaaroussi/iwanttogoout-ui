import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isAuth = false;

  player = {
    name: '',
    life: 0,
    position: [0, 0]
  };

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
        (data) => {
          if(data != null) {
            this.isAuth = true;
            return "";
          }
          else return false;
      });
    } catch (error) {
      return false;
    }
    return false;
  }

}
