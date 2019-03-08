import { Injectable } from '@angular/core';

import { Game, FilterObject } from '../models/models';

import { DataService } from './data.service';

@Injectable()
export class GamesService {
  games: Game[];
  spaces: string[] = [];
  events: string[] = [];
  settings: string[] = [];
  filters: FilterObject;
  gameToImprove: Game | '' = '';

  constructor(private dataService: DataService) { }

  init() {
    this.dataService.get('https://nicolaosskimas.com/api/gsm-games-data.json').subscribe(res => {
      this.games = <Game[]>res;
      this.orderGames();
      this.createLists();
    });

    this.setEmptyFilters();
  }

  orderGames() {
    this.games.sort((game1, game2) => {
      if (game1.name < game2.name) {
        return -1;
      } else if (game1.name > game2.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  createLists() {
    this.games.forEach(game => {
      game.spaces.forEach(space => {
        if (!this.spaces.includes(space)) {
          this.spaces.push(space);
        }
      });
      game.events.forEach(event => {
        if (!this.events.includes(event)) {
          this.events.push(event);
        }
      });
      game.settings.forEach(setting => {
        if (!this.settings.includes(setting)) {
          this.settings.push(setting);
        }
      });
    });
  }

  getGameByUrl(url: string): Game | null {
    return this.games.find(game => game.url === url) || null;
  }

  setEmptyFilters() {
    this.filters = {
      search: '',
      event: '',
      space: '',
      setting: '',
    };
  }

}
