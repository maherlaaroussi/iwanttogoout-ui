import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

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

}
