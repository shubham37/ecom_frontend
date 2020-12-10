import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addreses : Object[] = [];

  toggle : boolean = false;

  constructor(private router: Router, private buyerApi: BuyerService) {   
  }

  ngOnInit(): void {
    this.buyerApi.fetchAddresses().subscribe(
      data => {
        if (data != null) {
          this.addreses = data;
          console.log(data);
        } else {
          this.addreses = [];
        }
      },
      error => {
        this.addreses = [];
        console.log(error);
      }
    )
  }

  showShippingBlock() {
    if (this.toggle) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

  placeOrder() {
    if (localStorage.getItem('isLogin')) {
      this.router.navigate(['/payment']);
    } else {
      this.router.navigate(['/account']);
    }
  }

}
