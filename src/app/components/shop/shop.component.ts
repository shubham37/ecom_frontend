import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public isInfoShow: boolean=true;
  public isBusinessShow: boolean=false;
  public isBankShow: boolean=false;
  public formData = new FormData();

  isPorceessing : boolean = false;

  formGroup : FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private sellerApi: SellerService) { 
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userid: '',
      shop_name: '',
      phone: '',
      password: '',
      cnf_password: '',
      address: '',
      city: '',
      zip_code: '',
      country: 1,
      gst: '',
      pancard: [null],
      adharcard: [null],
      logo: [null],
      board: [null],
      role: 1,
      minimum_order: 0,
      category: 1,
      ifsc: '',
      bank_city: '',
      branch: '',
      account_holder: '',
      account_number: '',
      bank: '',
      proof: [null]      
    })
    this.isInfoShow = true;
    this.isBusinessShow = false;
    this.isBankShow  = false;
  }

  onInfoSubmit() {
    this.isInfoShow = false;
    this.isBusinessShow = true;
    this.isBankShow = false;
  }

  onBusinessSubmit() {
    this.isInfoShow = false;
    this.isBusinessShow = false;
    this.isBankShow = true;
  }

  onPanChange(event) {
    const file= (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      pancard: file
    });
    console.log(this.formGroup.value.pancard)
    this.formGroup.get('pancard').updateValueAndValidity();
  }

  onAdharChange(event) {
    const file= (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      pancard: file
    });
    this.formGroup.get('adharcard').updateValueAndValidity();
  }

  onLogoChange(event) {
    const file= (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      pancard: file
    });
    this.formGroup.get('logo').updateValueAndValidity();
  }

  onBoardChange(event) {
    const file= (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      pancard: file
    });
    this.formGroup.get('board').updateValueAndValidity();
  }

  onProofChange(event) {
    const file= (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      pancard: file
    });
    this.formGroup.get('proof').updateValueAndValidity();
  }

  onBankSubmit() {
    this.isPorceessing = true;
    const formData = new FormData();
    // formData.append('userid', this.formGroup.value.userid)
    // formData.append('phone', this.formGroup.value.phone)
    // formData.append('password', this.formGroup.value.password)
    // formData.append('cnf_password', this.formGroup.value.cnf_password)
    // formData.append('address', this.formGroup.value.address)
    // formData.append('city', this.formGroup.value.city)
    // formData.append('zip_code', this.formGroup.value.zip_code)
    // formData.append('country', this.formGroup.value.country)
    // formData.append('gst', this.formGroup.value.gst)
    // formData.append('pancard', this.formGroup.value.pancard)
    // formData.append('adharcard', this.formGroup.value.adharcard)
    // formData.append('logo', this.formGroup.value.logo)
    // formData.append('board', this.formGroup.value.board)
    // formData.append('role', this.formGroup.value.role)
    // formData.append('minimum_order', this.formGroup.value.minimum_order)
    // formData.append('category', this.formGroup.value.category)
    // formData.append('ifsc', this.formGroup.value.ifsc)
    // formData.append('bank_city', this.formGroup.value.bank_city)
    // formData.append('branch', this.formGroup.value.branch)
    // formData.append('account_holder', this.formGroup.value.account_holder)
    // formData.append('account_number', this.formGroup.value.account_number)
    // formData.append('bank', this.formGroup.value.bank)
    // formData.append('proof', this.formGroup.value.proof)

    console.log(formData);
    var x = document.getElementById("snackbar");
    this.sellerApi.sellerRegistration(this.formGroup.value).subscribe(
      data => {
        this.isPorceessing = false;
        x.innerText = "Your Shop Registered Successfully"
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        localStorage.setItem("shop_registered", "Yes");
        localStorage.setItem('token', data.token);
        this.isInfoShow = true;
        this.isBusinessShow = false;
        this.isBankShow = false;
        window.location.href = '/';
      },
      error => {
        this.isPorceessing = false;
        x.innerText = error.message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        console.log(error);
      }
    )
  }
}
