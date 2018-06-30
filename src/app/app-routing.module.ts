import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListComponent, GameDetailsComponent, ContributeComponent } from './components/components';
import { ValidGameGuard } from './guards/guards';

const routes: Routes = [
  { path: 'contribute', component: ContributeComponent },
  { path: ':gameUrl', component: GameDetailsComponent, canActivate: [ValidGameGuard] },
  { path: '', component: GameListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routableComponents = [
  GameListComponent,
  GameDetailsComponent,
  ContributeComponent,
];
