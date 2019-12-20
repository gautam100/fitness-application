import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getDashboardContent() {
    return this.http.get(API_URL + 'getDashboardContent');
  }

  getCategoryContent() {
    return this.http.get(API_URL + 'getCategoryContent');
  }

  getCateList(params) {
    return this.http.post(API_URL + 'getCateList', params, httpOptions);
  }
  
  getDashboardBranchOfferCount() {
    return this.http.get(API_URL + 'getDashboardBranchOfferCount');
  }

}
