import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

import { DashboardService } from '../@core/data/dashboard.service';
// import { GlobalVariableService } from '../@core/data/shared/global-variable.service';
import { HeaderService } from '../@core/data/header.service';
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
  user_name: any = {};
  user_id;
  title = 'Home Page';

  constructor(
    private dashboardService: DashboardService,
    // private globalVariableService: GlobalVariableService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {

    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user_id = JSON.parse(sessionStorage.getItem('currentUserID'));
    // console.log("user_name: ", this.user_name);
    // console.log("user_id: ", this.user_id);

    this.getDashboardPageList();

    this.headerService.title.subscribe(title => {
      this.title = title;
    });
    this.headerService.setTitle(this.user_name);

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

    // this.dashboardService.getDashboardBranchOfferCount().subscribe(
    //   data => {
    //     this.result = data;
    //     this.homePageLists = this.result.result;
    //     console.log("newData: ", this.homePageLists);
    //   },
    //   err => {
    //     console.log(err.message)
    //   },
    //   () => {
    //     console.log("loading finish")
    //   }
    // );

  }

}
