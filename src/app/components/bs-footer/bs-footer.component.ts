import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'bs-footer',
  templateUrl: './bs-footer.component.html',
  styleUrls: ['./bs-footer.component.css']
})
export class BsFooterComponent implements OnInit {
  formGroup;
  public isShowLoader: boolean = false;
  public subscribedMessage: String= '';

  constructor(private formBuilder: FormBuilder, private api: ApiService) { 
    this.formGroup = this.formBuilder.group({
      email: '',
    });
  }

  ngOnInit(): void {
  }

  onSubscribe(subscribeData) {
    this.subscribedMessage = '';
    this.isShowLoader = true;
    var email = subscribeData['email'];
    console.log(email);
    this.api.SubscribeNewsletter(email).subscribe(
      data => {
        this.isShowLoader = false;
        this.subscribedMessage = "You subscribed successfully."
        console.log(data);
      },
      error => {
        this.isShowLoader = false;
        this.subscribedMessage = "Please Try Again"
        console.log(error);
      }
    );

    // this.route.navigate(['/search'], { queryParams: { value: 'popular' } });
  }


}
