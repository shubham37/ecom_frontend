import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlists : Object[] = [];

  constructor(private buyerApi: BuyerService, private configApi: ConfigService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.buyerApi.fetchWishlist().subscribe(
      data => {
        this.wishlists = data.products;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  wishlistToCart(product) {
    this.configApi.addToCart(product);
    this.removeFromWishlist(product.id);
    this.getData();
  }

  removeFromWishlist(proId) {
    this.buyerApi.deleteWishlist(proId).subscribe(
      data => {
        window.location.reload(true);
      },
      error => {
        console.log(error);
      }
    )
  }

}
