import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  numbers : Object[];
  product = {};

  constructor(private route: ActivatedRoute, private productApi: ProductService) { 
    this.numbers = [
      1,2,3,4
    ]
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id)
    this.productApi.fetchProduct(this.route.snapshot.params.id).subscribe(
      data => {
        this.product = data;
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    )
  }

}