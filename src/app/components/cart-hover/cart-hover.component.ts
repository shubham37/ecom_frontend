import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import  { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-cart-hover',
  templateUrl: './cart-hover.component.html',
  styleUrls: ['./cart-hover.component.css']
})
export class CartHoverComponent implements OnInit {
  products : Object[] = [];
  dataRefresher: any;
  snackbar: any;
  subtotal = 0;

  constructor(private router: Router, private configApi: ConfigService) { 
    this.snackbar = document.getElementById('snackbar');
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();
  }

  getData() {
    this.configApi.calculatePrices();
    let cart = JSON.parse(localStorage.getItem('cart'))
    let prices = JSON.parse(localStorage.getItem('prices'))
    if (cart && cart != null && cart !=undefined) {
      this.products = cart
      if (prices && prices != null && prices !=undefined) {
        this.subtotal = prices.total
      }
    }
  }

  refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.getData();
      }, 2000);
  }

  removeFromCart(proId) {
    this.configApi.removeFromCart(proId);
    this.snackbar.innerText = "Item removed from Cart."
    this.snackbar.className = "show";
    setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
  }

  incrementQuantity(proId, currentQuantity) {
    this.configApi.incrementQuantity(proId, currentQuantity);
    this.getData();
  }

  decrementQuantity(proId, currentQuantity) {
    if (currentQuantity >1) {
      this.configApi.decrementQuantity(proId, currentQuantity);
      this.getData();
    }
  }

}
