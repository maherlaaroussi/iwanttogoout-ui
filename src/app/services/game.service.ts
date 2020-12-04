import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  isAuth = false;
  isDead = false;
  players = '';
  player = {
    name: '',
    life: 0,
    position: '',
  };
  map = {
    monsters: 0,
    size: 0,
    players: 0,
    dead_players: 0,
  };

  constructor(private apiService: ApiService) {}

  public async isServerOnline(): Promise<boolean> {
    const res = await this.apiService.getMap().catch(() => false);
    if (res) {
      return true;
    }
    return false;
  }

  public async newPlayer(name: string): Promise<any> {
    if (!name) {
      return false;
    }
    const res: any = await this.apiService.postPlayer(name).catch(() => false);
    if (res) {
      this.signIn(name);
      this.player.name = res.name;
      this.player.life = res.life;
      this.player.position = res.position;
      return res;
    } else {
      this.signOut();
      return false;
    }
  }

  public async movePlayer(name: string, direction: string): Promise<any> {
    if (!name || !direction) {
      return false;
    }
    const res: any = await this.apiService
      .postPlayerMove(name, direction)
      .catch(() => false);
    if (res) {
      this.syncData();
      return res;
    } else {
      return false;
    }
  }

  public async getPlayer(): Promise<any> {
    const res: any = await this.apiService
      .getPlayer(this.player.name)
      .catch(() => false);
    if (res) {
      return res;
    } else {
      return false;
    }
  }

  public async getMap(): Promise<any> {
    const res: any = await this.apiService.getMap().catch(() => false);
    if (res) {
      return res;
    } else {
      return false;
    }
  }

  public async getPlayers(): Promise<any> {
    const res: any = await this.apiService.getPlayers().catch(() => false);
    if (res) {
      return res;
    } else {
      return false;
    }
  }

  public async isPlayerDead(): Promise<any> {
    const res: any = await this.apiService
      .getPlayer(this.player.name)
      .catch(() => false);
    if (Number(res.life) > 0) {
      return false;
    } else {
      return true;
    }
  }

  public async syncData(): Promise<void> {
    const p: any = await this.apiService
      .getPlayer(this.player.name)
      .catch(() => {});
    if (p) {
      this.player.name = p.name;
      this.player.life = p.life;
      this.player.position = p.position;
    }

    const m: any = await this.apiService.getMap().catch((res) => {});
    if (m) {
      this.map.size = m.taille;
      this.map.players = m.joueurs;
      this.map.dead_players = m.joueurs_morts;
      this.map.monsters = m.monsters;
    }

    const players: any = await this.apiService.getMap().catch((res) => {});
    if (players) {
      this.players = players.joueurs;
    }
  }

  public signOut(): void {
    this.isAuth = false;
  }

  public signIn(name: string): void {
    this.isAuth = true;
  }

  public playerDead(): void {
    this.isAuth = true;
    this.isDead = true;
  }

  public restart(): void {
    this.isAuth = false;
    this.isDead = false;
  }
}
