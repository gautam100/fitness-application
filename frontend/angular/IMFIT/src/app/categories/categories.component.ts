import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

import { DashboardService } from '../@core/data/dashboard.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  result: any = [];
  branchContents = [];
  branchImages = [];
  loading = false;
  _cate_id: string;

  cateProductLists = [];
  
  constructor(
    private dashboardService: DashboardService,
    // private globalVariableService: GlobalVariableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDashboardPageList();
  }

  getDashboardPageList() {
    this.loading = true;
    this._cate_id = this.route.snapshot.paramMap.get("id");
    // console.log("catID: ", this._cate_id);
    this.dashboardService.getCateList({cat_id: this._cate_id}).subscribe(
      data => {
        this.result = data;
        this.cateProductLists = this.result.result;
        // console.log("cateLists: ", this.cateProductLists);
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
