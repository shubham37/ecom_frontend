import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  isLoggedIn : boolean = false;
  hasPrev : boolean = true;
  hasFwd : boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token && token != null && token != undefined) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
    }

    let path = window.location.pathname.split('/');
    if (path.length < 3) {
      this.hasPrev = false;
    } else if (path[2] == '3') {
      this.hasPrev = true;
      this.hasFwd = false;
    }
  }
  
  onNavigatePrev() {
    let path = window.location.pathname.split('/')[2];
    if (path == '2') {
      this.router.navigate(['check-out/3']).then(
        () => window.location.reload()
      )
    } else {
      this.router.navigate(['check-out']).then(
        () => window.location.reload()
      )
    }
  }

  onNavigateFwd() {
    let path = window.location.pathname.split('/');
    if (path.length < 3) {
      this.router.navigate(['check-out/2']).then(
        () => window.location.reload()
      )
    } else {
      this.router.navigate(['check-out/3']).then(
        () => window.location.reload()
      )
    }
  }


}

