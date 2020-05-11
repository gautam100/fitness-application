import { Component, OnInit } from '@angular/core';
import { DetailService } from '../@core/data/detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../@core/data/payment.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  result: any = [];
  branchContents = {};
  branchContent = {};
  branchImages = [];
  loading = false;
  _product_id: any;
  _subscription_amount: any;
  subscriptionType: string;
  balance_amount: any;
  discount_amount = 250;
  gst_state_amount = 67.50;
  gst_center_amount = 67.50;
  total_amount: any;
  paymentDetails: any = [];
  user_id: any;
  user_name: any = {};

  constructor(private detailService: DetailService,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService) { }

  ngOnInit() {
    this._product_id = parseInt(localStorage.getItem('product_id'));
    this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    // this._product_id = this.route.snapshot.paramMap.get("id");
    // this._subscription_amount = this.route.snapshot.paramMap.get("amount");

    // console.log("product_idss: ", this._product_id);
    // console.log("amounts: ", this._subscription_amount);

    this.balance_amount = this._subscription_amount - this.discount_amount;
    this.gst_state_amount = (this.balance_amount*9)/100;
    this.gst_center_amount = (this.balance_amount*9)/100;
    this.total_amount = this.balance_amount + this.gst_state_amount + this.gst_center_amount;

    this.detailService.getDetailContent({ 'product_id': this._product_id }).subscribe(
      data => {
        this.result = data;
        this.branchContents = this.result.results;
        this.branchContent = this.branchContents[0];
        console.log("payments: ", this.branchContent);
        
        if (this.branchContents[0].monthly_subscription_amt == this._subscription_amount) {
          this.subscriptionType = "Monthly";
        } else if (this.branchContents[0].quaterly_subscription_amt == this._subscription_amount) {
          this.subscriptionType = "Quaterly";
        } else if (this.branchContents[0].halfyearly_subscription_amt == this._subscription_amount) {
          this.subscriptionType = "Half Yearly";
        } else if (this.branchContents[0].yearly_subscription_amt == this._subscription_amount) {
          this.subscriptionType = "Yearly";
        }
      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );
  }

  goToPaymentConfirmation(productId, subscription_amt, discount_amount, gst_state_amount, gst_center_amount, total_amount) {
    // if (subscription_amt == "" || subscription_amt == undefined) {
    //   alert("Please choose plan...");
    //   return false;
    // }
    // this.router.navigate(['paymentConfirmationPage']);
    // this.router.navigate(['paymentpage/'+productId+'/'+amount]);

    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));

    this.paymentDetails = [];
    this.paymentDetails = {
      surl: 'http://localhost:3000/api/payment/payment-confirmation-page',
      furl: 'http://localhost:3000/api/payment/payment-failure-page',
      txnid: this.getRandomInt(),
      firstname: '',
      email: this.user_name.user_name,
      udf1: this.getRandomIntForOrder(),
      udf2: this._subscription_amount,
      udf3: this.discount_amount,
      udf4: this.user_id.user_id,
      udf5: this.subscriptionType,
      udf6: this.gst_center_amount,
      phone: '',
      amount: this.total_amount,
      // product_id: this._product_id,
      productinfo: this._product_id
    }
    console.log('details2 : ' + JSON.stringify(this.paymentDetails));
    this.paymentService.createPayment(this.paymentDetails).subscribe(
      res => {
        this.onSuccessPayment(res);
      },
      err => {
        this.onFailurePayment(err);
      }
    );
  }

  getRandomInt() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  getRandomIntForOrder() {
    return Math.floor(100000 + Math.random() * 900000)+this._product_id;
  }

  onSuccessPayment(response) {
    console.log('Success Payment : ', response);
    if (response.url) {
      // Render PayUmoney payment gateway page
      window.location.href = response.url;
    }
  }

  onFailurePayment(error) {
    console.log('Failure Payment : ' + error);
  }

}
