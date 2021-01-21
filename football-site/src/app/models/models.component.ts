import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelsService } from './models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  private results:any = [];
  public rowsToShow:any = [];
  public loading:boolean = true;
  public models = [];
  public dataMap:any = {
    'Model': 'model',
    'Optimized': 'optimized',
    'Pregame Prediction': 'pregame',
    'Home Team': 'home',
    'Away Team': 'away',
    'Home Actual Score': 'home_score',
    'Away Actual Score': 'away_score',
    'Home Predicted Score': 'p_home_score',
    'Away Predicted Score': 'p_away_score',
    'Home % Error': 'p_error_home',
    'Away % Error': 'p_error_away',
  };

  constructor(private modelsService:ModelsService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllResults();
  }

  async getAllResults() {
    this.loading = true;
    this.results = await this.modelsService.getAllResults().toPromise();
    this.rowsToShow = [...this.results];
    this.models = [...new Set(this.results.map(x => x.model))];
    this.changeModel({'target':{'value':this.models[0]}});
    this.loading = false;
  }

  async getResultsForModel(model:string) {
    this.loading = true;
    this.results = await this.modelsService.getResultsByModel(model).toPromise();
    this.loading = false;
  }

  goToModel(event) {
    this.router.navigate(['/Models/', event[0].model.replace(/\s/g, '')])
  }

  changeModel(event) {
    this.rowsToShow = this.results.filter(x => x.model == event.target.value);
  }

}
