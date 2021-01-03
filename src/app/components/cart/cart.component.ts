import { Component, OnInit } from '@angular/core';
import  { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products : Object[] = [];
  numbers: Object[];
  prices = {};

  constructor(private configApi: ConfigService) { 
    this.numbers  = [1,2,3,4]
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let prices = JSON.parse(localStorage.getItem('prices'))

    if (cart && cart != null && cart !=undefined) {
      this.products = cart
      if (prices && prices != null && prices !=undefined) {
        this.prices = prices
      }
    }
  }

  removeFromCart(proId) {
    this.configApi.removeFromCart(proId);
    this.configApi.calculatePrices();
    this.getData();
  }

  incrementQuantity(proId, currentQuantity) {
    this.configApi.incrementQuantity(proId, currentQuantity);
    this.configApi.calculatePrices();
    this.getData();
  }

  decrementQuantity(proId, currentQuantity) {
    if (currentQuantity >1) {
      this.configApi.decrementQuantity(proId, currentQuantity);
      this.configApi.calculatePrices();
      this.getData();
    }
  }

}
