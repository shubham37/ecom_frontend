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


  infoFormGroup = new FormGroup(
    {
      userid: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      cnf_password: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl(''),
      country: new FormControl('')
    }
  );

  businessFormGroup = new FormGroup({
    gst: new FormControl(''),
    pancard: new FormControl(''),
    adharcard: new FormControl(''),
    logo: new FormControl(''),
    board: new FormControl(''),
    role: new FormControl(''),
    minimum_order: new FormControl(''),
    category: new FormControl(''),
    pancardSOurce: new FormControl(''),
    adharcardSOurce: new FormControl(''),
    logoSOurce: new FormControl(''),
    boardSOurce: new FormControl(''),
  });

  bankingFormGroup = new FormGroup({
    ifsc: new FormControl(''),
    city: new FormControl(''),
    branch: new FormControl(''),
    account_holder: new FormControl(''),
    account_number: new FormControl(''),
    bank: new FormControl(''),
    proof: new FormControl(''),
    proofSource: new FormControl('')
  });

  constructor(private route: Router, private formBuilder: FormBuilder, private sellerApi: SellerService) { 
    console.log("Inside Constructor");

  }

  ngOnInit(): void {
    this.isInfoShow = true;
    this.isBusinessShow = false;
    this.isBankShow  = false;

  }

  onInfoSubmit(infoData) {
    // var userid = infoData['userid'];
    // var phone = infoData['phone'];
    // var password = infoData['password'];
    // var cnf_password = infoData['cnf_password'];
    // var address = infoData['address'];
    // var city = infoData['city'];
    // var zip_code = infoData['zip_code'];
    // var country = infoData['country'];
    console.log(infoData);
    this.isInfoShow = false;
    this.isBusinessShow = true;
    this.isBankShow = false;
  }

  onBusinessSubmit(businessData) {
    // var gst = businessData['gst'];
    // var role = businessData['role'];
    // var minimum_order = businessData['minimum_order'];
    // var category = businessData['category'];
    console.log(businessData);

    this.isInfoShow = false;
    this.isBusinessShow = false;
    this.isBankShow = true;
  }

  onPanChange(event) {
    const file= event.target.files[0];
    this.formData.append('pan', file, file.name);
    this.businessFormGroup.patchValue({pancardSOurce: file});
  }
  onAdharChange(event) {
    const file= event.target.files[0];
    this.formData.append('shar', file, file.name);
    this.businessFormGroup.patchValue({adharcardSOurce: file});
  }
  onLogoChange(event) {
    const file= event.target.files[0];
    this.formData.append('lo', file, file.name);
    this.businessFormGroup.patchValue({logoSOurce: file});
  }
  onBoardChange(event) {
    const file= event.target.files[0];
    this.formData.append('boas', file, file.name);
    this.businessFormGroup.patchValue({boardSOurce: file});
  }
  onProofChange(event) {
    const file= event.target.files[0];
    this.formData.append('pro', file, file.name);
    this.infoFormGroup.patchValue({proofSource: file});
  }

  onBankSubmit(bankingData) {
    console.log(bankingData);
    this.isInfoShow = false;
    this.isBusinessShow = true;
    this.isBankShow = true;
    
    // formData.append('pan', this.businessFormGroup.get('pancardSOurce').value);
    // formData.append('adhar', this.businessFormGroup.get('adharcardSOurce').value);
    // formData.append('log', this.businessFormGroup.get('logoSOurce').value);
    // formData.append('boar', this.businessFormGroup.get('boardSOurce').value);
    // formData.append('prof', this.bankingFormGroup.get('proofSource').value);
    console.log(this.formData);

    localStorage.setItem("shop_registered", "Yes");
    this.sellerApi.sellerRegistration(this.infoFormGroup.value, this.businessFormGroup.value, this.bankingFormGroup.value, this.formData).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token);
      },
      error => {
        console.log(error);
      }
    )
    // window.location.href = '/';
  }

  // onSubmit(contactData) {
  //   var name = contactData['name'];
  //   var email = contactData['email'];
  //   var subject = contactData['subject'];
  //   var comment = contactData['comment'];

  //   console.log(name);
  //   // this.route.navigate(['/search'], { queryParams: { value: 'popular' } });
  // }

}
