import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../../shared/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public team:string;
  public season:number = 2002;
  public teamInfo:any[] = [];
  public gamesInfo:any[] = [];
  public teamWins:number;
  public teamLosses:number;
  public teamTies:number;
  public seasons:number[] = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]
  public seasonStatsNumberColumns:string[] = [
    'home_pass_yards_per_attempt','home_rush_yards_per_attempt','home_turnovers_per_game','home_sacks_per_game','home_fumbles_per_game','home_int_per_game','home_forced_int_per_game','home_forced_fumbles_per_game','home_forced_turnovers_per_game'
  ];
  public seasonStatsDataMap:any = {
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
  };
  public gamesOStatsDataMap:any = {
    'Date': 'date',
    'Home': 'home',
    'Away': 'away',
    'Pass Yds Away': 'passing_yards_away',
    'Pass Yds Home': 'passing_yards_home',
	  'Rush Yds Away': 'rushing_yards_away',
    'Rush Yds Home': 'rushing_yards_home',
    'Ttl Yds Away': 'total_yards_away',
    'Ttl Yds Home': 'total_yards_home',
    'Pass Att Away': 'attempts_away',
    'Pass Att Home': 'attempts_home',
    'Compl Away': 'completions_away',
    'Compl Home': 'completions_home',
    'Rush Att Away': 'rushing_attempts_away',
    'Rush Att Home': 'rushing_attempts_home',
    'Pts Away': 'score_away',
    'Pts Home': 'score_home',
  };
  public gamesDStatsDataMap:any = {
    'Date': 'date',
    'Home': 'home',
    'Away': 'away',
    'Sacks Away': 'sacks_away',
    'Sacks Home': 'sacks_home',
    'Fumbles Away': 'fumbles_away',
    'Fumbles Home': 'fumbles_home',
    'Int Away': 'int_away',
    'Int Home': 'int_home',
    'TO Away': 'turnovers_away',
    'TO Home': 'turnovers_home',
    'D/ST TD Away': 'def_st_td_away',
    'D/ST TD Home': 'def_st_td_home'
  };
  public loading:boolean = true;


  constructor(private route:ActivatedRoute,
              public teamsService:TeamsService) {
    this.route.params.subscribe(params => this.team = params.team);
  }

  ngOnInit(): void {
    this.setupTeamStats();
  }

  async setupTeamStats() {
    this.loading = true;
    this.teamInfo = [];
    this.gamesInfo = [];

    const thisTeamHomeGames:any = await this.teamsService.getHomeSeasonStatsForTeam(this.team, this.season).toPromise();
    const thisTeamAwayGames:any = await this.teamsService.getAwaySeasonStatsForTeam(this.team, this.season).toPromise();

    this.teamInfo.push(thisTeamHomeGames[0]);

    let teamHomeWins = thisTeamHomeGames.map(x => x.score_home > x.score_away).filter(Boolean).length;
    let teamAwayWins = thisTeamAwayGames.map(x => x.score_away > x.score_home).filter(Boolean).length;

    let teamHomeTies = thisTeamHomeGames.map(x => x.score_home == x.score_away).filter(Boolean).length;
    let teamAwayTies = thisTeamAwayGames.map(x => x.score_home == x.score_away).filter(Boolean).length;

    this.gamesInfo = this.gamesInfo.concat(thisTeamHomeGames);
    this.gamesInfo = this.gamesInfo.concat(thisTeamAwayGames);

    let totalGames = this.gamesInfo.length;
    this.teamWins = teamHomeWins + teamAwayWins;
    this.teamTies = teamHomeTies + teamAwayTies;
    this.teamLosses = totalGames - this.teamWins - this.teamTies;

    this.loading = false;
  }

  changeSeason(event) {
    this.season = event.target.value;
    this.setupTeamStats();
  }

}
