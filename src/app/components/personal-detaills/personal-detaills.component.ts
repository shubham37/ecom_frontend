import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-personal-detaills',
  templateUrl: './personal-detaills.component.html',
  styleUrls: ['./personal-detaills.component.css']
})
export class PersonalDetaillsComponent implements OnInit {

  infoFormGroup;
  emailFormGroup;
  mobileFormGroup;
  pd = {};
  isPdEdit: boolean = false;
  isEmailEdit: boolean = false;
  isNumberEdit: boolean = false;


  constructor(private formBuilder: FormBuilder, private buyerApi: BuyerService) { 
    this.infoFormGroup = this.formBuilder.group({
      first_name: '',
      last_name: '',
      gender: 0,
    })
    this.emailFormGroup = this.formBuilder.group({
      email: '',
    });
    this.mobileFormGroup = this.formBuilder.group({
      mobile: '',
    })
  }

  ngOnInit(): void {
    this.buyerApi.fetchUserDetail().subscribe(
      data => {
        this.infoFormGroup.patchValue({'first_name': data?.first_name, 'last_name': data?.last_name, 'gender': data.gender})
        this.emailFormGroup.patchValue({'email': data.user?.email});
        this.mobileFormGroup.patchValue({'mobile': data.user?.number});
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  pdEdit () {
    this.isPdEdit = true;
  }

  pdCancel () {
    this.isPdEdit = false;
  }

  emailEdit () {
    this.isEmailEdit = true;
  }

  emailCancel () {
    this.isEmailEdit = false;
  }

  numberEdit () {
    this.isNumberEdit = true;
  }

  numberCancel () {
    this.isNumberEdit = false;
  }

  onInfoSubmit(infoData) {
    var first_name = infoData['first_name'];
    var last_name = infoData['last_name'];
    var gender = infoData['gender'];

    this.buyerApi.updatePD(first_name, last_name, gender).subscribe(
      data => {
        console.log(data);
        window.location.reload(true);
      },
      error => {
        console.log(error);
      }
    )

  }
  onEmailSubmit(emailData) {
    var email = emailData['email'];
    this.buyerApi.updateEmail(email).subscribe(
      data => {
        console.log(data);
        window.location.reload(true);
      },
      error => {
        console.log(error);
      }
    )
  }
  onMobileSubmit(mobileData) {
    var mobile = mobileData['mobile'];
    this.buyerApi.updateMobile(mobile).subscribe(
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
