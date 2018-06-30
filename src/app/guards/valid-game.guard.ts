import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { GamesService } from '../services/services';

@Injectable({
  providedIn: 'root'
})
export class ValidGameGuard implements CanActivate {

  constructor(private gameService: GamesService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.gameService.getGameByUrl(next.params.gameUrl)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
