import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './../@core/data/users.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  loading = false;
  error = false;
  success = false;
  errorMessage = "";
  successMessage = "";
  email: string;
  userCredentials: any = {};
  result: any;

  constructor(private uesrService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  }

  //Forgot Password
  forgot() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { email: this.email };
    console.log("uemail:: ", this.userCredentials);
    this.uesrService.doForgot(this.userCredentials).subscribe(
      data => {
        this.result = data;
        console.log("data: ", this.result);
        if (this.result.status == 1) {
          // this.setSession(this.result);

          this.success = true;
          this.successMessage = this.result.msg;
          // window.location.href = './index';
          // this.headerService.title.subscribe(title => {
          //   this.title = title;
          // });
          // this.headerService.setTitle('Login');          
        } else {
          this.error = true;
          // this.IsmodelShow = false;
          this.errorMessage = this.result.msg;
          // this.router.navigate([this.errorMessage]);
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


}
