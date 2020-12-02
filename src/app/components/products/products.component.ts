import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../services/buyer.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  numbers : Object[];
  products : Object[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private productApi: ProductService, private buyerApi: BuyerService) {
    this.numbers = [
      1,2,3
    ]
  }

  ngOnInit(): void {
    this.productApi.fetchProducts(this.route.snapshot.queryParams).subscribe(
      data => {
        this.products = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
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
