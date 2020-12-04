import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cart-hover',
  templateUrl: './cart-hover.component.html',
  styleUrls: ['./cart-hover.component.css']
})
export class CartHoverComponent implements OnInit {
  public products : Object[] = [];
  dataRefresher: any;
  snackbar: any;

  constructor(private router: Router) { 
    this.snackbar = document.getElementById('snackbar');
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();
  }

  getData() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      this.products = cart
    } else {
      this.products = []
    }
  }

  refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.getData();
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 2000);
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
    this.snackbar.innerText = "Item removed from Cart."
    this.snackbar.className = "show";
    setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
  }

  incrementQuantity(proId) {
    console.log(proId)
  }

  decrementQuantity(proId) {
    console.log(proId)
  }

}
