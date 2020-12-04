import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server = 'http://localhost:4200/api';

  constructor(private httpClient: HttpClient) {}

  public async getPlayers(): Promise<any> {
    return await this.httpClient.get(this.server + '/joueurs').toPromise();
  }

  public async getPlayer(name: string): Promise<any> {
    return await this.httpClient
      .get(this.server + '/joueurs/' + name)
      .toPromise();
  }

  public async getMap(): Promise<any> {
    return await this.httpClient.get(this.server + '/map').toPromise();
  }

  public async postPlayer(name: string): Promise<any> {
    return await this.httpClient
      .post(this.server + '/joueurs/' + name, '')
      .toPromise();
  }

  public async postPlayerMove(name: string, direction: string): Promise<any> {
    return await this.httpClient
      .post(
        this.server + '/joueurs/' + name + '/move?direction=' + direction,
        ''
      )
      .toPromise();
  }
}
