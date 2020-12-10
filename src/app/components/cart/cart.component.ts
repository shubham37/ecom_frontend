import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products : Object[] = [];
  numbers: Object[];

  constructor() { 
    this.numbers  = [1,2,3,4]
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      this.products = cart
    } else {
      this.products = []
    }
  }

  incrementQuantity(proId) {
    console.log(proId)
  }

  decrementQuantity(proId) {
    console.log(proId)
  }


}
