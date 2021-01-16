import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private proxy:string = environment.baseURL;

  constructor(private http:HttpClient) { }

  getLiveScores() {
    return this.http.get(`${this.proxy}/scores`,
                         { responseType: 'json' });
  }

}
