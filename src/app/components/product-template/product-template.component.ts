import { Component, OnInit, Input } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { ConfigService } from '../../services/config.service'

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit {
  numbers: Object[] = [1,2,3];
  @Input() product: any;
  snackbar: any;


  constructor(private buyerApi: BuyerService, private configApi: ConfigService) { }

  ngOnInit(): void {
    this.snackbar = document.getElementById("snackbar");
  }

  addToCart(product) {
    if (this.configApi.isLoggedIn()) {
      this.configApi.addToCart(product)
      this.snackbar.innerText = "Added Successfully."  
      setTimeout(
        function()
        {
          this.snackbar.className = this.snackbar.className.replace("show", ""); 
        }, 2000);
    } else {
      this.snackbar.innerText = "Please Log In or Register To Add in Cart."
      setTimeout(
        function()
        {
          this.snackbar.className = this.snackbar.className.replace("show", ""); 
        }, 2000);
    }
    this.snackbar.className = "show";
  }

  addToWishlist(id) {
    if (this.configApi.isLoggedIn()) {
      this.buyerApi.addWishlist(id).subscribe(
        data => {
          this.snackbar.innerText = "Added Successfully."  
          setTimeout(
            function()
            {
              this.snackbar.className = this.snackbar.className.replace("show", "");
            }, 2000);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.snackbar.innerText = "Please Log In or Register To Add in Wishlist."
      setTimeout(
        function()
        {
          this.snackbar.className = this.snackbar.className.replace("show", ""); 
        }, 2000);
    }
    this.snackbar.className = "show";
  }

}
