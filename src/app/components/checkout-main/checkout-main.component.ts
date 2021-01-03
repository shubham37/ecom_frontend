import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  isLoggedIn : boolean = false;
  hasPrev : boolean = true;
  hasFwd : boolean = true;
  bullets: any;
  MAX_STEPS = 4;
  currentStep = 1;
  path: any;

  constructor(private route: ActivatedRoute, private router: Router, private configApi: ConfigService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.configApi.isLoggedIn();
    this.path = window.location.pathname.split('/');
    if (this.path.length < 3) {
      this.hasPrev = false;
    } else if (this.path[2] == '3') {
      this.hasPrev = true;
      this.hasFwd = false;
    }
  }
  
  ngAfterViewInit(): void {
    var address = document.getElementById('address')
    var shipping = document.getElementById('shipping')
    var summary = document.getElementById('summary')
    if (this.path.length < 3) {
      address.classList.remove('active')
      address.classList.remove('completed')
      shipping.classList.remove('active')      
      shipping.classList.remove('completed')
      summary.classList.remove('active')      
      summary.classList.remove('completed')
      address.classList.add('active');
    } else if (this.path[2] == '2') {
      address.classList.remove('active');
      shipping.classList.remove('active')      
      shipping.classList.remove('completed')
      summary.classList.remove('active')      
      summary.classList.remove('completed')
      address.classList.add('completed');
      shipping.classList.add('active')
    } else {
      shipping.classList.remove('active')
      address.classList.add('completed');
      shipping.classList.add('completed')
      summary.classList.add('active')
    }
  }
  
  onNavigatePrev() {
    this.path = window.location.pathname.split('/')[2];
    if (this.path == '2') {
      this.router.navigate(['check-out']).then(
        () => window.location.reload()
      )
    } else {
      this.router.navigate(['check-out/2']).then(
        () => window.location.reload()
      )
    }
  }

  onNavigateFwd() {
    this.path = window.location.pathname.split('/');
    if (this.path.length < 3) {
      console.log(localStorage.getItem('shipping_address'))
      console.log(localStorage.getItem('billing_address'))
      console.log(localStorage.getItem('is_shipping_same'))
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

