import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service'
import { ConfigService } from '../../services/config.service'
import { BuyerService } from '../../services/buyer.service'

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css']
})
export class Checkout2Component implements OnInit {
  numbers : Object[];
  products : Object[]= [];
  snackbar : any;
  caddress = {}

  constructor(private sellerApi: SellerService, private configApi: ConfigService, private buyerApi: BuyerService) { 
    this.numbers = [
      1,2,3
    ]
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
    if (cart && cart != null && cart !=undefined) {
      this.products = cart
    }
  }

  chooseShippingOption(event: any, product: any): void {
    let shipping_charge: any = 0;
    let shipping_method: any = '3';

    if (event.target.value == '1') {
      // Store Will Deliver
      this.sellerApi.isDelivered(this.caddress, 'jagdamba-general-store-ghaziabad-up-201992').subscribe(
        data => {
          if (data.is_deliverable) {
            shipping_charge = data.charge
            shipping_method = '1'
          } else {
            this.snackbar.innerText = "Seller Will not able to Deliver On Your Pincode. Please Select Other Option."
            setTimeout(
            function()
            {
              this.snackbar.className = this.snackbar.className.replace("show", ""); 
            }, 2000);
            // event.target.value = '3'
          }
        }, error => {
          console.log(error)
        }
      )
    } else if(event.target.value == '2') {
      // 3rd Party Vendor Deliver
      shipping_charge = 50
      shipping_method = '2'
    } else {
      // Pick Your Self
      shipping_charge = 0
      shipping_method = '3'
    }

    let cart = JSON.parse(localStorage.getItem('cart'))
    for (var prod in cart) {
      if (cart[prod].id === product.id) {
         cart[prod].shipping_charge = shipping_charge;
         cart[prod].shipping_method = shipping_method;
         break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))

    this.configApi.calculatePrices()
  }

}
