import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Game } from '../../models/models';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'gsm-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[];

  constructor(private titleService: Title, private gamesService: GamesService) { }

  ngOnInit() {
    this.games = this.gamesService.games;
    this.titleService.setTitle('Game Center');
  }

  filterGamesList(): void {
    const filterCriteria = this.gamesService.filters;
    this.games = this.gamesService.games;
    if (filterCriteria.search) {
      filterCriteria.search = filterCriteria.search.toLowerCase();
      this.games = this.games.filter(game => {
        const inDescription = game.description.toLowerCase().includes(filterCriteria.search);
        const inName = game.name.toLowerCase().includes(filterCriteria.search);
        if (inDescription || inName) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (filterCriteria.event) {
      this.games = this.games.filter(game => {
        return game.events.includes(filterCriteria.event);
      });
    }
    if (filterCriteria.space) {
      this.games = this.games.filter(game => {
        return game.spaces.includes(filterCriteria.space);
      });
    }
    if (filterCriteria.setting) {
      this.games = this.games.filter(game => {
        return game.settings.includes(filterCriteria.setting);
      });
    }
  }
}
