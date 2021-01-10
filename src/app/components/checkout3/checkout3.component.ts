import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service'
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../services/buyer.service'


@Component({
  selector: 'app-checkout3',
  templateUrl: './checkout3.component.html',
  styleUrls: ['./checkout3.component.css']
})
export class Checkout3Component implements OnInit {
  products : Object[] = [];
  is_online: boolean = false;
  snackbar: any;
  prices= {};
  caddress = {}

  constructor(private orderApi: OrderService, private router: Router, private route: ActivatedRoute, private buyerApi: BuyerService) {
  }

  ngOnInit(): void {
    this.getData();
    this.snackbar = document.getElementById("snackbar");
    let same_shipping = JSON.parse(localStorage.getItem('is_shipping_same'))
    let address = -1
    if (same_shipping!= null && same_shipping!= undefined) {
      if (same_shipping) {
        address = Number(localStorage.getItem('billing_address'))
      } else {
        address = Number(localStorage.getItem('shipping_address'))
      }
    }

    this.buyerApi.fetchAddress(address).subscribe(
      data => {
        console.warn(data)
        this.caddress = data
      }, error => {
        console.error(error)
      }
    )
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

  placeOrder() {
    let order = {
      "shipping_address": localStorage.getItem("shipping_address"),
      "is_shipping_same": localStorage.getItem("is_shipping_same"),
      "billing_address": localStorage.getItem("billing_address"),
      "shipping_option": localStorage.getItem("shipping_option"),
      "products": JSON.parse(localStorage.getItem("cart")),
      "is_cod": localStorage.getItem("is_cod") || "true",
      "is_online": localStorage.getItem("is_online") || "false",
      "payment_detail": "",
      "prices": JSON.parse(localStorage.getItem('prices'))
    }
    // Call Api For Order Save
    this.orderApi.orderPlace(order).subscribe(
      data => {
        this.snackbar.innerText = data.detail
        setTimeout(
        function()
        {
          this.snackbar.className = this.snackbar.className.replace("show", ""); 
        }, 2000);
  
        this.orderApi.removeOrderDetails();
        this.router.navigate(['account/orders/',data.orderId]).then(
          () => window.location.reload()
        )
      }, error => {
        console.log(error);
      }
    )
  }

  choosePayment(event) : void {
    if (event.target.value === '1') {
      this.is_online= true;
      localStorage.setItem('is_cod', "false")
      localStorage.setItem('is_online', "true")
    } else {
      this.is_online= false;
      localStorage.setItem('is_cod', "true")
      localStorage.setItem('is_online', "false")
    }
  }

}
