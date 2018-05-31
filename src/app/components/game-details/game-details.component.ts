import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'gsm-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: Game | null;
  gameUrl: string;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private titleService: Title,
    private router: Router
  ) {
    this.gameUrl = this.route.snapshot.params.gameUrl;
  }

  ngOnInit() {
    this.game = this.gameService.getGameByUrl(this.gameUrl);
    this.titleService.setTitle('Game Center | ' + this.game.name);
  }

  goToImprove() {
    this.gameService.gameToImprove = this.game;
    this.router.navigate(['/contribute']);
  }

}
