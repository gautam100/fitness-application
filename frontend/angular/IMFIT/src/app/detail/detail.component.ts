import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DetailService } from '../@core/data/detail.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  result: any = [];
  branchContents = [];
  branchImages = [];
  loading = false;
  _product_id: string;

  constructor(
    private detailService: DetailService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getDetailsPageList();
    this.getDetailsPageImageList();
  }

  getDetailsPageList() {
    this.loading = true;

    this._product_id = this.route.snapshot.paramMap.get("id");
    this.detailService.getDetailContent({'product_id': this._product_id}).subscribe(
      data => {
        this.result = data;
        this.branchContents = this.result.results;
        console.log("detail: ", this.branchContents);
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
    this.detailService.getDetailImageContent({'product_id': this._product_id}).subscribe(
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

}
