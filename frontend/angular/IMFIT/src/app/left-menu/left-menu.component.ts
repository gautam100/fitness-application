import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../@core/data/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  result: any = [];
  categoryLists = [];
  loading = false;
  cate_id: string;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cate_id = this.route.snapshot.paramMap.get("id");

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
