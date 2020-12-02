import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.css']
})
export class CardTemplateComponent implements OnInit {

  cardFormGroup;
  yearCounter: Object[] = [20,21,22,23,24,25,26,27,28,29,30];
  monthCounter: Object[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  processing: boolean = false;


  constructor(private formBuilder: FormBuilder, private buyerApi: BuyerService) { 
    this.cardFormGroup = this.formBuilder.group({
      number: '',
      month: '',
      year: '',
      card_name: '',
    })
  }

  ngOnInit(): void {
  }

  onCardSubmit(cardData) {
    this.processing = true;
    this.buyerApi.addcard(cardData).subscribe(
      data => {
        this.processing = false;
        window.location.reload(true);
      },
      error => {
        console.log(error);
        this.processing = false;
      }
    )
  }
}
