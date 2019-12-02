import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from './../../@core/data/users.service';
import * as moment from "moment";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  userCredentials: any = {};
  currentUser: any = {};
  result: any;
  loading = false;
  error = false;
  errorMessage = "";
  constructor(private uesrService: UserService, private router: Router) { }

  login() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { email: this.email, password: this.password };
    this.uesrService.doLogin(this.userCredentials).subscribe(
      data => {
        this.result = data;
        if (this.result.status == 1) {
          // this.currentUser = {
          //   user_id: this.result.userData.loginDetails[0].user_id,
          //   user_name: this.result.userData.loginDetails[0].user_name,
          //   client_id: this.result.userData.loginDetails[0].client_id,
          // };
          this.setSession(this.result);
          this.router.navigate(['pages/home']);
        } else {
          this.error = true;
          this.errorMessage = "Invalid Email or Password...";
        }
      },
      err => {
        this.error = true;
        this.errorMessage = err.message;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresAt,authResult.expireTimeUnit);
    sessionStorage.setItem('currentUser', JSON.stringify({user_name:authResult.user_name}));
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

}
