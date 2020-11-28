import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server: string = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  public getPlayers(){
    return this.httpClient.get(this.server + '/joueurs');
  }

  public getMap(){
    return this.httpClient.get(this.server + 'http://localhost:8080/api/map');
  }

}
