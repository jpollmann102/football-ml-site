import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private proxy:string = environment.baseURL;
  public teamNames = ['49ers','Bears','Bengals','Bills','Broncos','Browns','Buccaneers','Cardinals','Chargers','Chiefs','Colts','Cowboys','Dolphins','Eagles','Falcons','Giants','Jaguars','Jets','Lions','Packers','Panthers','Patriots','Raiders','Rams','Ravens','Saints','Seahawks','Steelers','Texans','Titans','Vikings','Washington Football Team'];
  public teamLeague = {
    'NFC':['Cardinals','Falcons','Panthers','Bears','Cowboys','Lions','Packers','Rams','Vikings','Saints','Giants','Eagles','49ers','Seahawks','Buccaneers','Washington Football Team']
  };
  public teamLocation = {
    '49ers': 'San Francisco',
    'Bears': 'Chicago',
    'Bengals': 'Cincinatti',
    'Bills': 'Buffalo',
    'Broncos': 'Denver',
    'Browns': 'Cleveland',
    'Buccaneers': 'Tampa Bay',
    'Cardinals': 'Arizona',
    'Chargers': 'Los Angeles',
    'Chiefs': 'Kansas City',
    'Colts': 'Indianopolis',
    'Cowboys': 'Dallas',
    'Dolphins': 'Miami',
    'Eagles': 'Philadelphia',
    'Falcons': 'Atlanta',
    'Giants': 'New York',
    'Jaguars': 'Jacksonville',
    'Jets': 'New York',
    'Lions': 'Detroit',
    'Packers': 'Green Bay',
    'Panthers': 'Carolina',
    'Patriots': 'New England',
    'Raiders': 'Las Vegas',
    'Rams': 'Los Angeles',
    'Ravens': 'Baltimore',
    'Saints': 'New Orleans',
    'Seahawks': 'Seattle',
    'Steelers': 'Pittsburgh',
    'Texans': 'Houston',
    'Titans': 'Tennessee',
    'Vikings': 'Minnesota',
    'Washington Football Team': ''
  }

  constructor(private http:HttpClient) {
    this.teamLeague['AFC'] = this.teamNames.filter(x => !this.teamLeague['NFC'].includes(x));
  }

  getTeamImage(teamName:string) {
    return 'assets/'+teamName.toLowerCase()+'.png';
  }

  getHomeSeasonStatsForTeam(teamName:string, season:number) {
    return this.http.get(this.proxy+`/team/${teamName}/homeSeasonStats/${season}`,
                         { responseType: 'json' });
  }

  getAwaySeasonStatsForTeam(teamName:string, season:number) {
    return this.http.get(this.proxy+`/team/${teamName}/awaySeasonStats/${season}`,
                         { responseType: 'json' });
  }
}
