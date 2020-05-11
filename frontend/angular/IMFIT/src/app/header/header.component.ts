import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from './../@core/data/users.service';
import * as moment from "moment";

import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';
import * as $ from "jquery";
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  email: string;
  password: string;
  userCredentials: any = {};
  currentUser: any = {};
  result: any;
  loading = false;
  error = false;
  success = false;
  errorMessage = "";
  successMessage = "";
  IsmodelShow = false;
  headerService: any;
  title = 'Login';
  // display='none';
  public href: string = "";
  public user: any = SocialUser;



  // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private uesrService: UserService, private router: Router, private route: ActivatedRoute, private location: Location,
    private socialAuthService: AuthService) {
    this.href = location.path();
  }

  ngOnInit() {
  }

  facebookLogin() {
    console.log("facebook");
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = { email: userData.email, password: '', google_id: '', facebook_id: userData.id };
      // console.log("facebook users: ", this.user);

      this.uesrService.doRegister(this.user).subscribe(
        data => {
          this.result = data;
          if (this.result.status == 1) {
            this.setSession(this.result);
            // jQuery("#LoginModal").modal('hide');
            // this.router.navigate(['/cate/2']);
            window.location.href = './index';
          } else if (this.result.status == 2) {
            this.error = true;
            // this.IsmodelShow = false;
            this.errorMessage = "Email already exist...";
            // this.router.navigate([this.errorMessage]);
          } else {
            this.error = true;
            // this.IsmodelShow = false;
            this.errorMessage = "Invalid Email or Password...";
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
    });
  }

  googleLogin() {
    console.log("google");
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = { email: userData.email, password: '', google_id: userData.id, facebook_id: '' };
      // console.log("google users: ", this.user);

      this.uesrService.doRegister(this.user).subscribe(
        data => {
          this.result = data;
          if (this.result.status == 1) {
            this.setSession(this.result);
            // jQuery("#LoginModal").modal('hide');
            // this.router.navigate(['/cate/2']);
            window.location.href = './index';
          } else if (this.result.status == 2) {
            this.error = true;
            // this.IsmodelShow = false;
            this.errorMessage = "Email already exist...";
            // this.router.navigate([this.errorMessage]);
          } else {
            this.error = true;
            // this.IsmodelShow = false;
            this.errorMessage = "Invalid Email or Password...";
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

    });
  }


  login() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { email: this.email, password: this.password };
    // console.log("user: ", this.userCredentials);
    this.uesrService.doLogin(this.userCredentials).subscribe(
      data => {
        this.result = data;
        console.log("data: ", this.result);
        if (this.result.status == 1) {
          this.setSession(this.result);

          this.success = true;
          this.successMessage = "Login Successfully...";

          // this.getLoggedInName.emit("piyush");
          // this.router.navigate([this.successMessage]);          
          // this.IsmodelShow = true;
          // this.router.navigate(['']);
          // this.display='block';

          // jQuery("#LoginModal").modal('hide');
          // this.router.navigate([]);

          window.location.href = './index';

          // this.headerService.title.subscribe(title => {
          //   this.title = title;
          // });
          // this.headerService.setTitle('Login');          
        } else {
          this.error = true;
          // this.IsmodelShow = false;
          this.errorMessage = "Invalid Email or Password...";
          this.router.navigate([this.errorMessage]);
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
    const expiresAt = moment().add(authResult.expiresAt, authResult.expireTimeUnit);
    sessionStorage.setItem('currentUser', JSON.stringify({ user_name: authResult.user_name }));
    sessionStorage.setItem('currentUserID', JSON.stringify({ user_id: authResult.user_id }));
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  register() {
    this.loading = true;
    this.error = false;
    this.userCredentials = { email: this.email, password: this.password, google_id: '', facebook_id: '' };

    this.uesrService.doRegister(this.userCredentials).subscribe(
      data => {
        this.result = data;
        console.log("recieve:: ", this.result);
        console.log("statusR:: ", this.result.status);
        if (this.result.status == 1) {
          this.setSession(this.result);
          // this.success = true;
          // this.successMessage = "Login Successfully...";
          // this.router.navigate([this.errorMessage]);
          // this.IsmodelShow = true;
          // this.router.navigate(['index']);
          // this.router.navigate(['success']);
          // this.display='block';
          // jQuery("#LoginModal").modal('hide');
          // this.router.navigate(['/cate/2']);
          window.location.href = './index';
        } else if (this.result.status == 2) {
          this.error = true;
          // this.IsmodelShow = false;
          this.errorMessage = "Email already exist...";
          // this.router.navigate([this.errorMessage]);
        } else if (this.result.status == 3) {
          this.error = true;
          // this.IsmodelShow = false;
          this.errorMessage = "Registered but Mail not send...";
          // this.router.navigate([this.errorMessage]);
        } else {
          this.error = true;
          // this.IsmodelShow = false;
          this.errorMessage = "Invalid Email or Password...";
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

  //Forgot Password
  // forgot() {
  //   this.loading = true;
  //   this.error = false;
  //   this.userCredentials = { email: this.email };
  //   console.log("uemail:: ", this.userCredentials);
  //   this.uesrService.doForgot(this.userCredentials).subscribe(
  //     data => {
  //       this.result = data;
  //       console.log("data: ", this.result);
  //       if (this.result.status == 1) {
  //         // this.setSession(this.result);

  //         this.success = true;
  //         this.successMessage = "Mail Sent Successfully...";

  //         // window.location.href = './index';

  //         // this.headerService.title.subscribe(title => {
  //         //   this.title = title;
  //         // });
  //         // this.headerService.setTitle('Login');          
  //       } else {
  //         this.error = true;
  //         // this.IsmodelShow = false;
  //         this.errorMessage = "Mail not send...";
  //         this.router.navigate([this.errorMessage]);
  //       }
  //     },
  //     err => {
  //       this.error = true;
  //       this.errorMessage = err.message;
  //       this.loading = false;
  //     },
  //     () => {
  //       this.loading = false;
  //     }
  //   );
  // }

}
