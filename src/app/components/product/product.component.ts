import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ConfigService } from '../../services/config.service';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  numbers : Object[];
  product = {};
  rateFormGroup: FormGroup;
  detectGroup: FormGroup;
  show_rate: boolean = true;
  local_quantity = 1;
  cart_quantity = 0;
  show_available: boolean = true;
  snackbar: any;
  isInWishlist: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private productApi: ProductService,
    private configApi: ConfigService, private buyerApi: BuyerService) { 
    this.numbers = [
      1,2,3,4
    ]
    this.rateFormGroup = this.formBuilder.group({
      rating: new FormControl('2', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    });
    this.detectGroup = this.formBuilder.group({
      pincode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.snackbar = document.getElementById("snackbar");

    this.productApi.fetchProduct(this.route.snapshot.params.id).subscribe(
      data => {
        this.product = data;
        this.cart_quantity = this.configApi.alreadyInCart(data.id);
        console.log(data);
        if (this.configApi.isLoggedIn()) {
          this.buyerApi.isInYourWishlist(data.id).subscribe(
            data=> {
              this.isInWishlist = data.exist;
            }, error => {
              this.isInWishlist = false;
            }
          )
        }

      },
      error => {
        console.log(error.message);
      }
    )
  }

  openBlock(event, blockName: string) {
    var i: number, tabcontent: any, tablinks: any;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    document.getElementById(blockName).style.display = "block";
    event.currentTarget.className += " active";
  }

  showModal(image: string) {
    var imageBlock = document.getElementById('productImage');
    if (imageBlock.childNodes.length > 0) {
      imageBlock.removeChild(imageBlock.childNodes[0]);
    }
    var img = document.createElement('img'); 
    img.src =  'http://localhost:8000' + image;
    img.style.height = '100%';
    img.style.width = '100%';
    imageBlock.appendChild(img);
  }

  review_show(): void {
    if (this.show_rate) {
      this.show_rate = false;      
    } else {
      this.show_rate = true;
    }
  }

  onRateSubmit(proId): void {
    if (this.rateFormGroup.valid) {
      console.log(this.rateFormGroup.value)
      this.productApi.writeReview(proId, this.rateFormGroup.value).subscribe(
        data => {
          console.log(data);
          this.rateFormGroup.reset();
          this.show_rate = true;
          window.location.reload(true);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onDetectSubmit(proId): void {
    if (this.rateFormGroup.valid) {
      console.log(this.rateFormGroup.value)
    }
  }

  incrementQuantity() {
    this.local_quantity = this.local_quantity + 1
  }

  decrementQuantity() {
    if (this.local_quantity >1) {
      this.local_quantity = this.local_quantity - 1
    }
  }

  showAvailable() {
    if (this.show_available) {
      this.show_available = false;      
    } else {
      this.show_available = true;
    }
  }
  counter(i: number) {
    return new Array(i);
  }


  addToWishlist(proId): void {
    if (this.configApi.isLoggedIn()) {
      this.buyerApi.addWishlist(proId).subscribe(
        data => {
          this.snackbar.innerText = data.detail
          setTimeout(
            function()
            {
              this.snackbar.className = this.snackbar.className.replace("show", "");
            }, 3000);

            this.router.navigate(['/account/wishlist-user']);
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
        }, 3000);
    }
    this.snackbar.className = "show";
  }

  addToCart() {
    if (this.configApi.isLoggedIn()) {
      this.snackbar.innerText = this.configApi.addToCart(this.product, this.local_quantity)
      setTimeout(
        function()
        {
          this.snackbar.className = this.snackbar.className.replace("show", ""); 
        }, 2000);
        this.cart_quantity = this.local_quantity;
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


}
