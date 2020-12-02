import { Component, OnInit, Input } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit {
  numbers: Object[] = [1,2,3];
  @Input() product: any;


  constructor(private buyerApi: BuyerService) { }

  ngOnInit(): void {
    console.log(this.product)
  }

  addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      cart.push(product)
    } else {
      cart = []
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  addToWishlist(id) {
    this.buyerApi.addWishlist(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
