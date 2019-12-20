import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../@core/data/dashboard.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  result: any = [];
  categoryLists = [];
  loading = false;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {

    this.dashboardService.getCategoryContent().subscribe(
      data => {
        this.loading = true;
        this.result = data;
        this.categoryLists = this.result.result;
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
