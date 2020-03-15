import { Component, OnInit } from '@angular/core';
import { DetailService } from '../@core/data/detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../@core/data/order.service';

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})
export class PaymentConfirmationPageComponent implements OnInit {

  result: any = [];
  branchContents = {};
  branchContent = {};
  branchImages = [];
  loading = false;
  _product_id: any;
  _subscription_amount: any;
  subscriptionType: string;
  balance_amount: any;
  _discount_amount;
  _gst_state_amount;
  _gst_center_amount;
  _total_amount: any;
  _subscriptionType: string;

  orderCredentials: any = {};

  user_name: any = {};
  user_id;

  constructor(
    private detailService: DetailService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    
    this._product_id = parseInt(localStorage.getItem('product_id'));
    this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    this._discount_amount = parseInt(localStorage.getItem('discount_amount'));
    this._gst_state_amount = parseInt(localStorage.getItem('gst_state_amount'));
    this._gst_center_amount = parseInt(localStorage.getItem('gst_center_amount'));
    this._total_amount = parseInt(localStorage.getItem('total_amount'));
    this.balance_amount = this._subscription_amount - this._discount_amount;

    // this.detailService.getDetailContent({ 'product_id': this._product_id }).subscribe(
    //   data => {
    //     this.result = data;
    //     this.branchContents = this.result.results;
    //     this.branchContent = this.branchContents[0];
    //     console.log("payments: ", this.branchContent);

    //     if (this.branchContents[0].monthly_subscription_amt == this._subscription_amount) {
    //       this.subscriptionType = "Monthly";
    //     } else if (this.branchContents[0].quaterly_subscription_amt == this._subscription_amount) {
    //       this.subscriptionType = "Quaterly";
    //     } else if (this.branchContents[0].halfyearly_subscription_amt == this._subscription_amount) {
    //       this.subscriptionType = "Half Yearly";
    //     } else if (this.branchContents[0].yearly_subscription_amt == this._subscription_amount) {
    //       this.subscriptionType = "Yearly";
    //     }
    //   },
    //   err => {
    //     console.log(err.message)
    //   },
    //   () => {
    //     console.log("loading finish")
    //   }
    // );

    this._product_id = parseInt(localStorage.getItem('product_id'));
    this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    this._discount_amount = parseInt(localStorage.getItem('discount_amount'));
    this._gst_state_amount = parseInt(localStorage.getItem('gst_state_amount'));
    this._gst_center_amount = parseInt(localStorage.getItem('gst_center_amount'));
    this._total_amount = parseInt(localStorage.getItem('total_amount'));
    this.subscriptionType = localStorage.getItem('subscription_type');
    this.balance_amount = this._subscription_amount - this._discount_amount;

    this.orderCredentials = {user_id: this.user_id.user_id, product_branch_id: this._product_id, subscription_type: this.subscriptionType,charges: this._subscription_amount, discount: this._discount_amount, total_amount: this._total_amount};
    console.log("orderCred: ", this.orderCredentials);

    this.orderService.doOrders(this.orderCredentials).subscribe(
      data => {
        this.result = data;
        console.log("insertedData: ", this.result);
      }
    );

  }

}
