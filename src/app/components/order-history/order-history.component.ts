import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private orderApi: OrderService) { }

  ngOnInit(): void {
    this.orderApi.fetchOrder(1).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
