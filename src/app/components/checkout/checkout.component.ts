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
      localStorage.setItem('shipping_address', "");
      localStorage.setItem('is_shipping_same', "true");  
      this.toggle = false;
    }
    else {
      this.toggle = true;
      localStorage.setItem('is_shipping_same', "false");  
    }
  }

  billingAddress(event) {
    localStorage.setItem('billing_address', event.target.value);
    localStorage.setItem('is_shipping_same', "true");
  }

  shippingAddress(event) {
    localStorage.setItem('shipping_address', event.target.value);
    localStorage.setItem('is_shipping_same', "false");
  }

}
