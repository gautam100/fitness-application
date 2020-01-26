import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

import { DashboardService } from '../@core/data/dashboard.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../@core/data/header.service';

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
  user_name: any = {};
  title = 'Category Page';

  cateProductLists = [];
  
  constructor(
    private dashboardService: DashboardService,
    // private globalVariableService: GlobalVariableService,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getDashboardPageList();
    console.log("email2: ", this.user_name);

    this.headerService.title.subscribe(title => {
      this.title = title;
    });
    this.headerService.setTitle(this.user_name);
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
