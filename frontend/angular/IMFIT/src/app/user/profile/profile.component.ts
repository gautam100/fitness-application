import { Component, OnInit } from '@angular/core';
import { UserService } from './../../@core/data/users.service';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  currentUser: any = {};
  userDetails: any = {};
  result: any = {};

  userCredentials: any = {};
  user_id: any;
  user_name: string;
  password_check: string;
  user_pwd: string;
  address: string;
  loading = false;
  success = false;
  error = false;
  errorMessage = "";
  successMessage = "";

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getCurrentUser());
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    // console.log("userss: ", this.user_id.user_id);

    if (this.user == null) {
      this.router.navigate(['/']);
    } else {
      this.userService.getUserDetails({ userId: this.user_id.user_id }).subscribe(
        data => {
          this.result = data;
          this.userDetails = this.result.userData.userDetails[0][0];
          // console.log("userDetails2: ", this.result.userData.userDetails[0][0]);
        },
      )
    }
  }

  //Update user profile
  profile() {
    this.loading = true;
    this.error = false;

    if (this.userDetails.user_name == undefined) {
      return false;
    }

    this.userCredentials = { userId: this.user.user_id, user_name: this.userDetails.user_name, password_check: this.userDetails.password_check, user_pwd: this.userDetails.user_pwd };
    // console.log("Insert datas" + JSON.stringify(this.userCredentials));
    this.userService.updateUserDetails(this.userCredentials).subscribe(
      data => {
        this.result = data;
        if (this.result.userData.status == 1) {
          this.success = true;
          this.error = false;
        } else {
          this.success = false;
          this.error = true;
        }
      },
      err => {
        this.error = true;
        if (!err.error.auth)
          this.router.navigate(['./']);
      }
    );
  }

  updateAddress() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { userId: this.user_id.user_id, address: this.address };
    console.log("userCred: ", this.userCredentials);

    this.userService.manageUpdateAddress(this.userCredentials).subscribe(
      data => {
        this.result = data;
        console.log("recieve:: ", this.result);
        console.log("statusR:: ", this.result.userData.status);

        if (this.result.userData.status == 1) {
          this.success = true;
          this.successMessage = "Address Changed Successfully...";
          window.location.href = '/user/profile';
        } else {
          this.error = true;
          this.errorMessage = "Address Not Updated...";
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
