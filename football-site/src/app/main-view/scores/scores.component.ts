import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScoresService } from './scores.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit, OnDestroy {
  public liveScores:any;
  public loading:boolean = true;
  private time:number = 0;
  interval;

  constructor(private scoresService:ScoresService) { }

  ngOnInit(): void {
    this.getLiveScores();
    this.interval = setInterval(() => {
      this.time++;
      if(this.time == 30)
      {
        this.getLiveScores();
        this.time = 0;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  async getLiveScores() {
    this.liveScores = await this.scoresService.getLiveScores().toPromise();
    this.loading = false;
  }

  getDateObject(date:string) {
    let justDate:string = date.substring(0,8);
    let formatted:string = justDate.substring(0,4) + '-' + justDate.substring(4,6) + '-' + justDate.substring(6);
    let asDate = new Date(formatted);
    asDate.setDate(asDate.getDate() + 1);
    return asDate;
  }

}
