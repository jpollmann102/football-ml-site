import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private proxy:string = environment.baseURL;

  constructor(private http:HttpClient) { }

  getAllResults() {
    return this.http.get(this.proxy+`/results`,
                         { responseType: 'json' });
  }

  getResultsByModel(model:string) {
    return this.http.get(this.proxy+`/results/${model}`,
                         { responseType: 'json' });
  }

}
