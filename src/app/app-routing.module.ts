import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListComponent, GameDetailsComponent, ContributeComponent } from './components/components';

const routes: Routes = [
  { path: 'contribute', component: ContributeComponent },
  { path: ':gameUrl', component: GameDetailsComponent },
  { path: '', component: GameListComponent }
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
