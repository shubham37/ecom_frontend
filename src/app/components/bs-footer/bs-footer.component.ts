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
  snackbar: any;
  
  constructor(private formBuilder: FormBuilder, private api: ApiService) { 
    this.formGroup = this.formBuilder.group({
      email: '',
    });
  }
  
  ngOnInit(): void {
  }
  
  onSubscribe(subscribeData) {
    this.snackbar = document.getElementById("snackbar");
    this.subscribedMessage = '';
    this.isShowLoader = true;
    var email = subscribeData['email'];
    console.log(email);
    this.api.SubscribeNewsletter(email).subscribe(
      data => {
        this.isShowLoader = false;
        this.snackbar.innerText = "You subscribed successfully."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      },
      error => {
        this.isShowLoader = false;
        this.snackbar.innerText = error.message
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    );
  }


}
