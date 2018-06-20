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
  message: string;
  submitted = false;

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

  dismiss() {
    this.message = '';
    this.submitted = false;
  }

  onSubmit(info) {
    if (info.success) {
      if (info.operation === 'new') {
        this.message = `Your new game '${info.data.name}' has been submitted.`;
      } else {
        this.message = `Your improvements to '${info.data.gameName}' have been submitted.`;
      }
      this.message += 'Thanks for your help in making the Game Center even more awesome!';
    } else {
      if (info.operation === 'new') {
        this.message = `Unfortunately, your new game '${info.data.name}' could not be submitted due to a technical error.`;
      } else {
        this.message = `Unfortunately, your improvements to '${info.data.gameName}' could not be submitted due to a technical error.`;
      }
    }

    this.submitted = true;
  }

}
