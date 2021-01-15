import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../../shared/teams.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
  @Input() conference:string;
  private teams:string[];
  public teamsInfo:object[] = [];
  public season:number = 2002;
  public loading:boolean = true;
  public numberColumns:string[] = [
    'home_pass_yards_per_attempt','home_rush_yards_per_attempt','home_turnovers_per_game','home_sacks_per_game','home_fumbles_per_game','home_int_per_game','home_forced_int_per_game','home_forced_fumbles_per_game','home_forced_turnovers_per_game'
  ];
  public dataMap:any = {
    'Team': 'home',
    'Season Pass Yds': 'home_season_pass_yards',
    'Season Pass Att': 'home_season_pass_attempts',
    'Season Rush Yds': 'home_season_rush_yards',
    'Season Rush Att': 'home_season_rush_attempts',
    'Season Pts Scored': 'home_season_points_scored',
    'Season Yds': 'home_season_yardage',
    'Season Def Td': 'home_season_defensive_td',
    'Pass Yds/Att': 'home_pass_yards_per_attempt',
    'Rush Yds/Att': 'home_rush_yards_per_attempt',
    'TO/Gm': 'home_turnovers_per_game',
    'Sacks/Gm': 'home_sacks_per_game',
    'Fumbles/Gm': 'home_fumbles_per_game',
    'Int/Gm': 'home_int_per_game',
    'Forced Int/Gm': 'home_forced_int_per_game',
    'Forced Fumbles/Gm': 'home_forced_fumbles_per_game',
    'Forced TO/Gm': 'home_forced_turnovers_per_game'
  }

  constructor(public teamsService:TeamsService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.teams = this.teamsService.teamLeague[this.conference];
    this.setupTeamStats();
  }

  async setupTeamStats() {
    this.loading = true;
    for(let i = 0; i < this.teams.length; i++)
    {
      const thisTeamInfo = await this.teamsService.getSeasonStatsForTeam(this.teams[i], this.season).toPromise();
      this.teamsInfo.push(thisTeamInfo[0]);
    }
    this.loading = false;
  }

  goToTeam(event) {
    this.router.navigate(['/League/Team', event[0].home])
  }

}
