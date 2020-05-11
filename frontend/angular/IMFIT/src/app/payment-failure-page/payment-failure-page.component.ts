import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../@core/data/order.service';

@Component({
  selector: 'app-payment-failure-page',
  templateUrl: './payment-failure-page.component.html',
  styleUrls: ['./payment-failure-page.component.scss']
})
export class PaymentFailurePageComponent implements OnInit {

  result: any = [];
  orderContents = {};
  orderContent = {};
  order_id;
  balance;
  _gst_state_amount;
  _gst_center_amount;

  orderCredentials: any = {};

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {

    this.order_id = this.route.snapshot.paramMap.get("order_id");
    // console.log("new order id: ", this.order_id);

    this.orderService.getOrderConfirmation({ 'order_id': this.order_id }).subscribe(
      data => {
        this.result = data;
        this.orderContents = this.result.results;
        this.orderContent = this.orderContents[0];
        console.log("ordersD: ", this.orderContent);

       this.balance = this.orderContents[0].charges - this.orderContents[0].discount;
      //  console.log("balance: ", this.balance);

      this._gst_state_amount = (this.balance*9)/100;
      this._gst_center_amount = (this.balance*9)/100;  

      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );
  }
}
