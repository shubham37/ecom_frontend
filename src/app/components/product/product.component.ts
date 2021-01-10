import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ConfigService } from '../../services/config.service';
import { BuyerService } from '../../services/buyer.service';


declare const L: any;

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

    debugger
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
      this.productApi.writeReview(proId, this.rateFormGroup.value).subscribe(
        data => {
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

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    let dLon = this.deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }
  

  showOnMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      let mymap = L.map('mapid').setView([coords.latitude, coords.longitude], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2h1YmhhbTM3IiwiYSI6ImNramx0OHBxaTByYmUyc3MydG1lZTZqZGUifQ.rc9s5YFOQOMzq4dE2PfPDw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);
      var marker = L.marker([coords.latitude, coords.longitude]).addTo(mymap);
      var shop = L.marker([28.7035237,77.4587127]).addTo(mymap);
      marker.bindPopup("You Are here.").openPopup()
      shop.bindPopup("Shop Here.").openPopup()      
      // console.warn(this.getDistanceFromLatLonInKm(coords.latitude, coords.longitude, 28.7035237,77.4587127))
    })
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
