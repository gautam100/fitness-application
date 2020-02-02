import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DetailService } from '../@core/data/detail.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  result: any = [];
  branchContents = {};
  branchContent = {};
  branchImages = [];
  loading = false;
  _product_id: string;
  user_name: any = {};

  subscription_amt: any;
  productId;
  productCredentials: any = {};
  currentUser: any = {};
  error = false;
  success = false;
  public href: string = "";

  constructor(
    private detailService: DetailService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.href = location.path();
    // this.subscription_amt = 1200;
  }

  ngOnInit() {
    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log("username: ", this.user_name);
    this.getDetailsPageList();
    this.getDetailsPageImageList();
  }

  getDetailsPageList() {
    this.loading = true;

    this._product_id = this.route.snapshot.paramMap.get("id");
    this.detailService.getDetailContent({ 'product_id': this._product_id }).subscribe(
      data => {
        this.result = data;
        this.branchContents = this.result.results;
        this.branchContent = this.branchContents[0];
        console.log("detail: ", this.branchContent);
      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );
  }

  getDetailsPageImageList() {
    this.loading = true;
    this._product_id = this.route.snapshot.paramMap.get("id");
    this.detailService.getDetailImageContent({ 'product_id': this._product_id }).subscribe(
      data => {
        this.result = data;
        this.branchImages = this.result.results;
        console.log("Images: ", this.branchImages);
      },
      err => {
        console.log(err.message);
        this.loading = false;
      },
      () => {
        console.log("loading finish");
        this.loading = false;
      }
    );
  }

  goToPayment(productId, amount) {
    if (amount == "" || amount == undefined) {
      alert("Please choose plan...");
      return false;
    }
    console.log("Resetting filters ON click OpenTAs: ", amount);
    localStorage.setItem('product_id', productId);
    localStorage.setItem('subscription_amount', amount);
    this.router.navigate(['paymentpage']);
    // this.router.navigate(['paymentpage/'+productId+'/'+amount]);
  }

  // subscriptionPlan(){
  //   this.loading = true;
  //   this.error = false;
  //   this.productCredentials = { subscription: this.subscription_amt, productId: this._product_id };
  //   console.log("user: ", this.productCredentials);
  // }

}
