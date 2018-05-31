import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { GamesService } from '../../services/games.service';

@Component({
  selector: 'gsm-filter-games',
  templateUrl: './filter-games.component.html',
  styleUrls: ['./filter-games.component.scss']
})
export class FilterGamesComponent implements OnInit {
  spaces: string[];
  events: string[];
  settings: string[];
  @Output() filter = new EventEmitter<{}>();

  get searchQuery(): string {
    return this.gamesService.filters.search;
  }
  set searchQuery(value: string) {
    this.gamesService.filters.search = value;
    this.filter.emit();
  }

  get eventFilter(): string {
    return this.gamesService.filters.event;
  }
  set eventFilter(value: string) {
    this.gamesService.filters.event = value;
    this.filter.emit();
  }

  get spaceFilter(): string {
    return this.gamesService.filters.space;
  }
  set spaceFilter(value: string) {
    this.gamesService.filters.space = value;
    this.filter.emit();
  }

  get settingFilter(): string {
    return this.gamesService.filters.setting;
  }
  set settingFilter(value: string) {
    this.gamesService.filters.setting = value;
    this.filter.emit();
  }

  constructor(private gamesService: GamesService) {
    this.events = this.gamesService.events;
    this.spaces = this.gamesService.spaces;
    this.settings = this.gamesService.settings;
  }

  ngOnInit() {
    this.filter.emit();
  }

  clearFilters() {
    this.gamesService.clearFilters();
    this.filter.emit();
  }

}
