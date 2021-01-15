import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  public nfc:string[] = [];
  public afc:string[] = [];

  constructor(private route:ActivatedRoute,
              private teamsService:TeamsService) {
    this.route.params.subscribe(params => this.setupTeamsForLeague(params));
  }

  ngOnInit(): void {

  }

  setupTeamsForLeague(params):void {
    if(params.league == 'AFC')
    {
      this.afc = this.teamsService.teamLeague['AFC'];
      this.nfc = [];
    }else if(params.league == 'NFC')
    {
      this.nfc = this.teamsService.teamLeague['NFC'];
      this.afc = [];
    }else
    {
      this.nfc = this.teamsService.teamLeague['NFC'];
      this.afc = this.teamsService.teamLeague['AFC'];
    }
  }

}
