import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GamesService, DataService } from '../../services/services';

import { Game } from '../../models/models';

@Component({
  selector: 'gsm-improve-game',
  templateUrl: './improve-game.component.html',
  styleUrls: ['./improve-game.component.scss']
})
export class ImproveGameComponent {
  @Input() selectedGame: Game | '';
  games: Game[];
  improvements: String;
  @Output() submitResult = new EventEmitter<object>();
  @Output() clear = new EventEmitter();

  constructor(private gameService: GamesService, private dataService: DataService) {
    this.games = gameService.games;
  }

  submit() {
    // Dismiss any notifications
    this.clear.emit();

    if (this.selectedGame && this.improvements) {
      const submission = {
        gameName: this.selectedGame.name,
        gameId: this.selectedGame.id,
        improvements: this.improvements
      };

      const notification = {
        operation: 'improve',
        data: submission,
        success: false
      };

      const url = '/assets/backend/improve.php';
      this.dataService.post(url, submission).subscribe(res => {
        notification.success = true;
        this.submitResult.emit(notification);
        this.selectedGame = '';
        this.improvements = '';
      }, err => {
        this.submitResult.emit(notification);
      });
    }
  }

}
