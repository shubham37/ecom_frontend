import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service'


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() amount: number;

  constructor(private orderApi: OrderService) { }

  ngOnInit(): void {
  }

  payByCard(card: any) {
    this.orderApi.generatePaymentData(this.amount).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }

}
