import { Component, OnInit } from '@angular/core';
import { DetailService } from '../@core/data/detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../@core/data/order.service';
import { HttpClient } from '@angular/common/http';
import { PayUMoneyService } from '../@core/data/payumoney.service';

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})
export class PaymentConfirmationPageComponent implements OnInit {

  result: any = [];
  orderContents = {};
  orderContent = {};
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
  order_id;
  balance;

  orderCredentials: any = {};

  user_name: any = {};
  user_id;

  public payuform: any = {};
  disablePaymentButton: boolean = true;

  constructor(
    private detailService: DetailService,
    private orderService: OrderService,
    private payUMoneyService: PayUMoneyService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }


  // confirmPayment() {
  //   const paymentPayload = {
  //     email: this.payuform.email,
  //     name: this.payuform.firstname,
  //     phone: this.payuform.phone,
  //     productInfo: this.payuform.productinfo,
  //     amount: this.payuform.amount
  //   }
  //   return this.detailService.getDetailContent({ 'product_id': this._product_id, paymentPayload }).subscribe(
  //     data => {
  //       console.log(data);
  //       this.payuform.txnid = '';
  //       this.payuform.surl = '';
  //       this.payuform.furl = '';
  //       this.payuform.key = '';
  //       this.payuform.hash = '';
  //       this.payuform.txnid = '';
  //       this.disablePaymentButton = false;
  //     }, error1 => {
  //       console.log(error1);
  //     })
  // }

  ngOnInit() {

    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));

    // this._product_id = parseInt(localStorage.getItem('product_id'));
    // this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    // this._discount_amount = parseInt(localStorage.getItem('discount_amount'));
    // this._gst_state_amount = parseInt(localStorage.getItem('gst_state_amount'));
    // this._gst_center_amount = parseInt(localStorage.getItem('gst_center_amount'));
    // this._total_amount = parseInt(localStorage.getItem('total_amount'));
    // this.balance_amount = this._subscription_amount - this._discount_amount;

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
        
      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );

    // this._product_id = parseInt(localStorage.getItem('product_id'));
    // this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    // this._discount_amount = parseInt(localStorage.getItem('discount_amount'));
    // this._gst_state_amount = parseInt(localStorage.getItem('gst_state_amount'));
    // this._gst_center_amount = parseInt(localStorage.getItem('gst_center_amount'));
    // this._total_amount = parseInt(localStorage.getItem('total_amount'));
    // this.subscriptionType = localStorage.getItem('subscription_type');
    // this.balance_amount = this._subscription_amount - this._discount_amount;

    // this.orderCredentials = { user_id: this.user_id.user_id, product_branch_id: this._product_id, subscription_type: this.subscriptionType, charges: this._subscription_amount, discount: this._discount_amount, total_amount: this._total_amount };
    // console.log("orderCred: ", this.orderCredentials);

    // this.orderService.doOrders(this.orderCredentials).subscribe(
    //   data => {
    //     this.result = data;
    //     console.log("insertedData: ", this.result);
    //   }
    // );

  }

  // submitPaymentForm() {
  //   if(this.checkValidations(this.payUMoney)) {
  //     this.payUMoneyService.makePayment(this.payUMoney).subscribe(
  //       PayUMoneyModel => this.onPaymentSuccess(PayUMoneyModel),
  //       error => this.onPaymentFailure(error)
  //     );
  //   } else {
  //     let message = new Message();
  //     message.isError = true;
  //     message.error_msg = "Fields missing";
  //     this.messageService.message(message);
  //   }
  // }

}
