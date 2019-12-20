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
export class DetailService {

  constructor(private http: HttpClient) {
  }

  getDetailContent(params) {
    return this.http.post(API_URL + 'getDetailContent', params, httpOptions);
  }
  getDetailImageContent(params) {
    return this.http.post(API_URL + 'getDetailImageContent', params, httpOptions);
  }

}
