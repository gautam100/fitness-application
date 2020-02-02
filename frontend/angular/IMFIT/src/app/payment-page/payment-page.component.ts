import { Component, OnInit } from '@angular/core';
import { DetailService } from '../@core/data/detail.service';
import { ActivatedRoute } from '@angular/router';

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

  user_name: any = {};

  constructor(private detailService: DetailService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this._product_id = parseInt(localStorage.getItem('product_id'));
    this._subscription_amount = parseInt(localStorage.getItem('subscription_amount'));
    // this._product_id = this.route.snapshot.paramMap.get("id");
    // this._subscription_amount = this.route.snapshot.paramMap.get("amount");

    // console.log("product_idss: ", this._product_id);
    // console.log("amounts: ", this._subscription_amount);

    this.balance_amount = this._subscription_amount-this.discount_amount;
    this.gst_state_amount = 67.50;
    this.gst_center_amount = 67.50;
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

}
