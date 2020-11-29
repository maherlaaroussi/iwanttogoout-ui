import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server: string = "http://localhost:4200/api";

  constructor(private httpClient: HttpClient) { }

  public getPlayers(){
    return this.httpClient.get(this.server + '/joueurs');
  }

  public getPlayer(naùe: string){
    return this.httpClient.get(this.server + '/joueurs/' + name);
  }

  public getMap(){
    return this.httpClient.get(this.server + '/map');
  }

  public postPlayer(name: string){
    return this.httpClient.post(this.server + '/joueurs/' + name, "");
  }

}
