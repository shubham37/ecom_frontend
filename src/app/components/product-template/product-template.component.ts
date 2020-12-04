import { Component, OnInit, Input } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit {
  numbers: Object[] = [1,2,3];
  @Input() product: any;


  constructor(private buyerApi: BuyerService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.product)
  }

  addToCart(product) {
    var x = document.getElementById("snackbar");
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      cart.push(product)
    } else {
      cart = []
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    x.className = "show";
    x.innerText = "Added Successfully."
  
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  addToWishlist(id) {
    this.buyerApi.addWishlist(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
