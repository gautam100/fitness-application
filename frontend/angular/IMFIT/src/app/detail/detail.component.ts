import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

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
  branchContent = [];
  loading = false;
  _product_id: number;

  constructor(
    private detailService: DetailService,
    ) { }

  ngOnInit() {
    this.getDetailsPageList();
  }

  getDetailsPageList() {
    this.loading = true;

    this._product_id = 1;
    this.detailService.getDetailContent(this._product_id).subscribe(
      data => {
        this.result = data;
        this.branchContent = this.result.result;
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

}
