import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Object[] = [];
  rateFormGroup;
  reviewing_order: any;

  constructor(private formBuilder: FormBuilder, private orderApi: OrderService) { 
    this.rateFormGroup = this.formBuilder.group({
      rating: '2',
      description: '',
    });
  }

  ngOnInit(): void {
    this.orderApi.fetchOrders().subscribe(
      data => {
        console.log(data);
        this.orders = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onRateSubmit(): void {
    var rating = this.rateFormGroup.value['rating'];
    var review = this.rateFormGroup.value['description'];
    this.orderApi.writeOrderReview(this.reviewing_order, review, rating).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  readyToReview(orderId): void {
    this.reviewing_order = orderId;
  }

  cancelOrder(orderId: any): void {
    console.log(orderId);
  }

  returnOrder(orderId: any): void {
    console.log(orderId);
  }

}
