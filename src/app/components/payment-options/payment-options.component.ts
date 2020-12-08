import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.css']
})
export class PaymentOptionsComponent implements OnInit {
  cards : Object[] = [];

  constructor(private buyerApi: BuyerService) { 
  }

  ngOnInit(): void {
    this.buyerApi.fetchcards().subscribe(
      data => {
        this.cards = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  onDelete(id) {
    this.buyerApi.deletecard(id).subscribe(
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
