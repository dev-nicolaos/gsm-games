import { Component, Input } from '@angular/core';

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
  success = false;

  constructor(private gameService: GamesService, private dataService: DataService) {
    this.games = gameService.games;
  }

  submit() {
    if (this.selectedGame && this.improvements) {
      const submission = {
        gameName: this.selectedGame.name,
        gameId: this.selectedGame.id,
        improvements: this.improvements
      };
      const url = '/assets/backend/improve.php';
      this.dataService.post(url, submission).subscribe(res => {
        console.log(res);
        this.success = true;
      }, err => {
        console.error(err);
      });
    }
  }
}
