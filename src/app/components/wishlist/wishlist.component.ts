import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  numbers : Object[];
  wishlists : Object[] = [];

  constructor(private buyerApi: BuyerService) { 
    this.numbers = [1,2,3,4]
  }

  ngOnInit(): void {
    this.buyerApi.fetchWishlist().subscribe(
      data => {
        this.wishlists = data.products;
        // debugger
        console.log(data);
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

  removeFromWishlist(proId) {
    this.buyerApi.deleteWishlist(proId).subscribe(
      data => {
        console.log(data);
        window.location.reload(true);
      },
      error => {
        console.log(error);
      }
    )
  }

}
