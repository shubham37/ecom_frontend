import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'address-template',
  templateUrl: './address-template.component.html',
  styleUrls: ['./address-template.component.css']
})
export class AddressTemplateComponent implements OnInit {

  addressFormGroup;
  selectedCity = '';
  selectedState = '';
  processing: boolean = false;

  constructor(private formBuilder: FormBuilder, private buyerApi: BuyerService, private apiService: ApiService) { 
    this.addressFormGroup = this.formBuilder.group({
      full_name: '',
      mobile: '',
      pincode: '',
      locality: '',
      address: '',
      landmark: '',
      alternative_mobile: '',
      add_type: ''
    })
  }

  ngOnInit(): void {}
  
  onPincodeChange(event) {
    this.processing = true;
    this.apiService.getLocationByPincode(event.target.value).subscribe(
      data => {
        this.selectedCity = data[0].city.city_name;
        this.selectedState = data[0].city.state.state_name;
      },
      error => {
        console.log(error)
      }
    )
    this.processing = false;
  }

  onAddressSubmit(addressData) {
    this.processing = true;
    this.buyerApi.addAddress(addressData).subscribe(
      data => {
        this.processing = false;
        window.location.reload(true);
      },
      error => {
        this.processing = false;
        console.log(error.message);
      }
    )
  }

}
