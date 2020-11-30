import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server: string = "http://localhost:4200/api";

  constructor(private httpClient: HttpClient) { }

  public async getPlayers(){
    return await this.httpClient.get(this.server + '/joueurs').toPromise();
  }

  public async getPlayer(name: string){
    return await this.httpClient.get(this.server + '/joueurs/' + name).toPromise();
  }

  public async getMap(){
    return await this.httpClient.get(this.server + '/map').toPromise();
  }

  public async postPlayer(name: string){
    return await this.httpClient.post(this.server + '/joueurs/' + name, "").toPromise();
  }

  public async postPlayerMove(name: string, direction: string){
    return await this.httpClient.post(this.server + '/joueurs/' + name + '/move?direction=' + direction, "").toPromise();
  }

}
