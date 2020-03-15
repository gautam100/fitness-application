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
export class PayUMoneyService {

  constructor(private http: HttpClient) {
  }

  // makePayment1(payUMoney: PayUMoneyModel) {
  //   return this.http.post(API_URL + 'payumoney', params, httpOptions);
  // }

  // makePayment(payUMoney: PayUMoneyModel) {
  //   let url = 'payment/payumoney';
  //   let body = payUMoney;
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(API_URL + 'payment/payumoney', JSON.stringify(body), options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

}
