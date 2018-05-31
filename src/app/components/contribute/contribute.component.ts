import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Game } from '../../models/models';

import { GamesService } from '../../services/services';

@Component({
  selector: 'gsm-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {
  subComponent: string | null;
  selectedGame: Game | '';

  constructor(private titleService: Title, private gamesService: GamesService) {
    this.subComponent = null;
    this.selectedGame = '';
  }

  ngOnInit() {
    this.titleService.setTitle('Contribute to Game Center');
    if (this.gamesService.gameToImprove) {
      this.selectedGame = this.gamesService.gameToImprove;
      this.gamesService.gameToImprove = '';
      this.subComponent = 'improveGame';
    }
  }

}
