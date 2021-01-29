import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './league/team/team.component';
import { LeagueComponent } from './league/league.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModelsComponent } from './models/models.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  { path: 'Models', component: ModelsComponent },
  { path: 'Models/:model', component: ModelsComponent },
  { path: 'Data', component: DataComponent },
  { path: 'League/Team/:team', component: TeamComponent, },
  { path: 'League/:league', component: LeagueComponent },
  { path: '', component: MainViewComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
