import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

import { DashboardService } from '../@core/data/dashboard.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  result: any = [];
  homePageLists = [];
  loading = false;

  constructor(
    private dashboardService: DashboardService,
    // private globalVariableService: GlobalVariableService,
  ) { }

  ngOnInit() {
    this.getDashboardPageList();
  }

  getDashboardPageList() {
    this.loading = true;

    this.dashboardService.getDashboardContent().subscribe(
      data => {
        this.result = data;
        this.homePageLists = this.result.result;
        console.log("newData: ", this.homePageLists);
      },
      err => {
        console.log(err.message)
      },
      () => {
        console.log("loading finish")
      }
    );

    this.dashboardService.getDashboardBranchOfferCount().subscribe(
      data => {
        this.result = data;
        this.homePageLists = this.result.result;
        console.log("newData: ", this.homePageLists);
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
