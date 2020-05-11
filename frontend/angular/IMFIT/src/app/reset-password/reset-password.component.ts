import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './../@core/data/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  error = false;
  success = false;
  errorMessage = "";
  successMessage = "";
  password: string;
  email: string;
  user_id: string;
  userCredentials: any = {};
  result: any;

  constructor(private uesrService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  }

  reset() {
    this.loading = true;
    this.error = false;
    this.user_id = this.route.snapshot.paramMap.get("id");
    this.userCredentials = { reset_password: this.password, user_id: this.user_id };
    console.log("password:: ", this.userCredentials);
    this.uesrService.doReset(this.userCredentials).subscribe(
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
