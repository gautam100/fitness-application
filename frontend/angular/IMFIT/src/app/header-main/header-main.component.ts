import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../@core/data/header.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  user_name: any = {};
  title = 'Home Page';

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.user_name = JSON.parse(sessionStorage.getItem('currentUser'));
    this.headerService.title.subscribe(title => {
      this.title = title;
    });
    this.headerService.setTitle(this.user_name);
    // console.log('title: ', this.title);
  }

}
