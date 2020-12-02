import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isLoggedIn : boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token && token != null && token != undefined) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  }

  onlogout() {
    let token = localStorage.getItem('token');
    if (token && token != null && token != undefined) {
      localStorage.removeItem('token');
      window.location.reload(true);
    }
  }

}
