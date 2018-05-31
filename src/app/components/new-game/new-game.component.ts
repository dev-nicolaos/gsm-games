import { Component } from '@angular/core';

import { GamesService, DataService } from '../../services/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'gsm-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {
  events: string[];
  spaces: string[];
  settings: string[];
  success = false;

  constructor(private gameService: GamesService, private dataService: DataService) {
    this.events = gameService.events;
    this.spaces = gameService.spaces;
    this.settings = gameService.settings;
  }

  submitNewGame(newGameForm: NgForm) {
    let gameSubmission = {
      name: newGameForm.value.gameName,
      description: newGameForm.value.gameDescription,
      events: [],
      spaces: (newGameForm.value.space === 'Both') ? ['Indoors', 'Outdoors'] : [newGameForm.value.space],
      settings: (newGameForm.value.setting === 'Both') ? ['Organized', 'Freetime'] : [newGameForm.value.setting],
    }
    for (const prop in newGameForm.value) {
      if (prop.startsWith('event_') && newGameForm.value[prop]) {
        const index = prop.indexOf('_') + 1;
        gameSubmission.events.push(prop.substring(index));
      }
    }

    newGameForm.reset();

    const url = '/assets/backend/new-game.php';
    this.dataService.post(url, gameSubmission).subscribe(res => {
      console.log(res);
      this.success = true;
    }, err => {
      console.error(err);
    });
  }

}
