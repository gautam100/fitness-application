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
  _product_id: string;
  user_name: any = {};


  constructor(private detailService: DetailService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this._product_id = this.route.snapshot.paramMap.get("id");
    // console.log("idss: ", this._product_id);

    this.detailService.getDetailContent({ 'product_id': this._product_id }).subscribe(
      data => {
        this.result = data;
        this.branchContents = this.result.results;
        this.branchContent = this.branchContents[0];
        console.log("payments: ", this.branchContent);
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
