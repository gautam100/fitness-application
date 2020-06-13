import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel, NgForm, FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../@core/data/users.service';
import * as moment from "moment";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit {

  password: string;
  confirm_password: string;
  existing_password: string;
  userCredentials: any = {};
  currentUser: any = {};
  result: any;
  loading = false;
  error = false;
  success = false;
  errorMessage = "";
  successMessage = "";
  user_id;

  constructor(private uesrService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    // console.log("uuid", this.user_id.user_id);
  }

  updatePassword() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { userId: this.user_id.user_id, password: this.password, existing_password: this.existing_password };

    // console.log("userCred: ", this.userCredentials);

    if (this.existing_password == undefined) {
      this.error = true;
      this.errorMessage = "Please enter existing password...";
    } else if (this.password == undefined) {
      this.error = true;
      this.errorMessage = "Please enter password...";
    } else if (this.confirm_password == undefined) {
      this.error = true;
      this.errorMessage = "Please enter confirm password...";
    } else if (this.password != this.confirm_password) {
      this.error = true;
      this.errorMessage = "Password Mismatched...";
    } else {
      this.uesrService.managePassword(this.userCredentials).subscribe(
        data => {
          this.result = data;
          console.log("recieve:: ", this.result);
          console.log("statusR:: ", this.result.userData.status);

          if (this.result.userData.status == 1) {
            this.success = true;
            this.successMessage = "Password Updated Successfully...";
          } else if (this.result.userData.status == 2) {
            this.success = true;
            this.successMessage = "Please Enter Correct Existing Password...";
          } else {
            this.error = true;
            this.errorMessage = "Password Not Update Successfully...";
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

}
