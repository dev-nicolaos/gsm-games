import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GamesService, DataService } from '../../services/services';

@Component({
  selector: 'gsm-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {
  events: string[];
  spaces: string[];
  settings: string[];
  @Output() submitResult = new EventEmitter<object>();
  @Output() clear = new EventEmitter();

  constructor(private gameService: GamesService, private dataService: DataService) {
    this.events = gameService.events;
    this.spaces = gameService.spaces;
    this.settings = gameService.settings;
  }

  submitNewGame(newGameForm: NgForm) {
    // Dismiss any notifications
    this.clear.emit();

    const gameSubmission = {
      gameName: newGameForm.value.gameName,
      description: newGameForm.value.gameDescription,
      events: [],
      spaces: (newGameForm.value.space === 'Both') ? ['Indoors', 'Outdoors'] : [newGameForm.value.space],
      settings: (newGameForm.value.setting === 'Both') ? ['Organized', 'Freetime'] : [newGameForm.value.setting],
    };
    for (const prop in newGameForm.value) {
      if (prop.startsWith('event_')) {
        if (prop.endsWith('other') && newGameForm.value[prop]) {
          gameSubmission.events.push(newGameForm.value[prop]);
        } else if (newGameForm.value[prop]) {
          const index = prop.indexOf('_') + 1;
          gameSubmission.events.push(prop.substring(index));
        }
      }
    }

    const notification = {
      operation: 'new',
      data: gameSubmission,
      success: false,
      noEvents: false,
    };

    if (gameSubmission.events.length < 1) {
      notification.noEvents = true;
      this.submitResult.emit(notification);
      return;
    }

    const url = '/assets/backend/new-game.php';
    this.dataService.post(url, gameSubmission).subscribe(res => {
      notification.success = true;
      this.submitResult.emit(notification);
      newGameForm.reset();
    }, err => {
      this.submitResult.emit(notification);
    });
  }
}
