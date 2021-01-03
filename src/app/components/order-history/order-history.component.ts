import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  isStatusShow = false;
  orderID: string = "OIDMZqPLt2";
  order: Object = {} ;
  quantity = 0;
  products: Object[] = [];
  prices = {}
  address ={}

  constructor(private orderApi: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderID = this.route.snapshot.params.order_id
    console.log(this.orderID)
    this.orderApi.fetchOrder(this.orderID).subscribe(
      data => {
        console.log(data);
        this.order = data
        this.products = data.order_detail.products
        this.prices = data.order_detail.price_detail
        data.order_detail.products.map((product) => {
          this.quantity = this.quantity + product.quantity;
        })
        if (data.order_detail.is_shipping_same) {
          this.address = data.order_detail.billing_address
        } else {
          this.address = data.order_detail.shipping_address
        }
      },
      error => {
        console.log(error.message);
      }
    )
  }

  showStatus(): void {
    this.isStatusShow = true;
  }

  closeStatus(): void {
    this.isStatusShow = false;
  }

}
