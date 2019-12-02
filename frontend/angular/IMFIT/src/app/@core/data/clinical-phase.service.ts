import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ClinicalPhaseService {

  constructor(private http: HttpClient) {
  }

  getClinicalPhase() {
    return this.http.get(API_URL + 'getClinicalPhase');
  }

}
