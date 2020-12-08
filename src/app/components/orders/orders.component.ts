import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders : Object[] = [1,2,3];
  rateFormGroup;

  constructor(private formBuilder: FormBuilder, private orderApi: OrderService) { 
    this.rateFormGroup = this.formBuilder.group({
      rating: '',
      description: '',
    });
  }

  ngOnInit(): void {
    // this.orderApi.fetchOrders().subscribe(
    //   data => {
    //     console.log(data);
    //     this.orders = [];
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

  onRateSubmit(rateData) {
    var rating = rateData['rating'];
    var review = rateData['description'];
    this.orderApi.writeOrderReview(1, review, rating).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    console.log(review);
  }

}
