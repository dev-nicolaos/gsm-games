import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { routableComponents } from './app-routing.module';
import {
  FilterGamesComponent,
  GameCardComponent,
  NewGameComponent,
  ImproveGameComponent,
  NotificationComponent,
} from './components/components';

import { GamesService, DataService } from './services/services';
import { NoSpacePipe } from './pipes/no-space.pipe';
import { ValidGameGuard } from './guards/guards';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    FilterGamesComponent,
    GameCardComponent,
    ImproveGameComponent,
    NewGameComponent,
    NotificationComponent,
    NoSpacePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [GamesService, Title, DataService, ValidGameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
