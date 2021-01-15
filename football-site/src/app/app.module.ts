import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TeamComponent } from './league/team/team.component';
import { LeagueComponent } from './league/league.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModelsComponent } from './models/models.component';
import { ConferenceComponent } from './league/conference/conference.component';
import { SortableTableComponent } from './shared/sortable-table/sortable-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TeamComponent,
    LeagueComponent,
    MainViewComponent,
    NotFoundComponent,
    ModelsComponent,
    ConferenceComponent,
    SortableTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
