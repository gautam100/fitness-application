import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/data/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  user: any;
  currentUser: any = {};
  orderDetails: any = [];
  orderPaymentDetails: any = [];
  result: any = {};

  userCredentials: any = {};
  user_id: any;
  user_name: string;
  password_check: string;
  user_pwd: string;
  loading = false;
  success = false;
  error = false;
  errorMessage = "";

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getCurrentUser());
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    // console.log("userss: ", this.user_id.user_id);

    if (this.user == null) {
      this.router.navigate(['/']);
    } else {
      this.userService.getUserOrders({ userId: this.user_id.user_id }).subscribe(
        data => {
          this.result = data;
          this.orderDetails = this.result.userData.orderDetails[0];
          console.log("orderDetails: ", this.result.userData.orderDetails[0]);
        },
      )
    }
  }

  getOrderDetails(id) {
    console.log("hello", id);
    this.userService.getUserOrdersDetails({ orderId: id }).subscribe(
      data => {
        this.result = data;
        console.log("details: ", this.result);
        this.orderPaymentDetails = this.result.userData.orderDetails[0][0];
        console.log("orderPaymentDetails: ", this.result.userData.orderDetails[0][0]);
      },
    )
  }

}
