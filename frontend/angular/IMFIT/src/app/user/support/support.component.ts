import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel, NgForm, FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../@core/data/users.service';
import * as moment from "moment";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

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
  email;
  mobile;
  user_id;
  comment;

  constructor(private uesrService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    // console.log("uuid", this.user_id.user_id);
  }

  questionRaised() {
    this.loading = true;
    this.error = false;
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    this.userCredentials = { userId: this.user_id.user_id, email: this.email, mobile: this.mobile, comment: this.comment };

    console.log("userCred: ", this.userCredentials);

    if (this.email == undefined) {
      this.error = true;
      this.errorMessage = "Please enter email...";
    } else if (this.mobile == undefined) {
      this.error = true;
      this.errorMessage = "Please enter mobile number...";
    } else if (this.comment == undefined) {
      this.error = true;
      this.errorMessage = "Please enter comment...";
    } else {
      this.uesrService.questionRaised(this.userCredentials).subscribe(
        data => {
          this.result = data;
          console.log("recieve:: ", this.result);
          console.log("statusR:: ", this.result.userData.status);

          if (this.result.userData.status == 1) {
            this.success = true;
            this.successMessage = "Request send successfully...";
          } else {
            this.error = true;
            this.errorMessage = "Request not send Successfully...";
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

