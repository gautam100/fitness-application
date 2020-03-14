import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { HttpService } from '../shared/sharedService/httpService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor(private http: HttpClient) {
  }

  createPayment(params) {
    // const PAYMENT_URL = '/payment/pay';
    // return this.httpService.post(PAYMENT_URL, paymentRequest);
    return this.http.post(API_URL + 'api/payment/pay', params, httpOptions);
  }

}
