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

  priceSort: string = '';
  location: string = '';

  cateNames;
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
    // console.log("email2: ", this.user_name);

    this.headerService.title.subscribe(title => {
      this.title = title;
    });
    this.headerService.setTitle(this.user_name);
  }

  priceSorting(event: any) {
    this.priceSort = event.target.value;
    // console.log("priceSort:: ", this.priceSort);
    this.getDashboardPageList(this.priceSort, this.location);
  }

  selectLocation(event: any){
    this.location = event.target.value;
    // console.log("location:: ", this.location);
    this.getDashboardPageList(this.priceSort, this.location);
  }

  getDashboardPageList(priceSort='', location='') {
    this.loading = true;
    this._cate_id = this.route.snapshot.paramMap.get("id");
    // console.log("catID: ", this._cate_id);

    //get category name
    this.dashboardService.getCateName({cat_id: this._cate_id}).subscribe(
      data => {
        this.result = data;
        this.cateNames = this.result.result[0].name;
        // console.log("cateNames: ", this.cateNames);
      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );

    this.dashboardService.getCateList({cat_id: this._cate_id, price_sort: priceSort, location: location}).subscribe(
      data => {
        this.result = data;
        this.cateProductLists = this.result.result;
        console.log("cateLists: ", this.cateProductLists);
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
