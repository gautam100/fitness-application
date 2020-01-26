import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import * as moment from "moment";

let counter = 0;
const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return Observable.of(this.userArray[counter]);
  }
  test() {
    return this.http.get(API_URL + 'dashboard');
  }
  doLogin(data) {
    return this.http.post(API_URL + 'login', data, httpOptions);
  }
  doRegister(data) {
    return this.http.post(API_URL + 'register', data, httpOptions);
  }
  getCurrentUser(): string {
    return sessionStorage.getItem('currentUser');
  }
  getUserDetails(params) {
    return this.http.post(API_URL + 'getProfile', params, httpOptions);
  }
  updateUserDetails(params) {
    return this.http.post(API_URL + 'editProfile', params, httpOptions);
  }
  isLoggednIn() {
    //return JSON.parse(this.getCurrentUser()) !== null;
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggednIn();
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


}
