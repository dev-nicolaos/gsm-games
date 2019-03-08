import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GamesService } from './services/services';

@Component({
  selector: 'gsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public router: Router, public gameService: GamesService) {}

  ngOnInit() {
    this.gameService.init();
  }
}
