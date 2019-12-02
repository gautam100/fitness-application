import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['user/login']);
   }

  ngOnInit() {
  }

}
