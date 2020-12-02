import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cart-hover',
  templateUrl: './cart-hover.component.html',
  styleUrls: ['./cart-hover.component.css']
})
export class CartHoverComponent implements OnInit {
  public products : Object[] = [];

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      this.products = cart
    } else {
      this.products = []
    }
  }

  removeFromCart(proId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart != null && cart !=undefined) {
      let newCart: any = [];
      cart.forEach(function(product) {
        if (product.id != proId) {
          newCart.push(product);
        }
      })
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    console.log(proId)
  }

  incrementQuantity(proId) {
    console.log(proId)
  }

  decrementQuantity(proId) {
    console.log(proId)
  }

}
