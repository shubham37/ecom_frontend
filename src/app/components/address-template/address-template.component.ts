import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BuyerService } from '../../services/buyer.service';
import { SimpleChanges } from '@angular/core';

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
  @Input() address:any;
  create: boolean = true;
  snackbar:  any;


  constructor(private formBuilder: FormBuilder, private buyerApi: BuyerService, private apiService: ApiService) { 
    this.addressFormGroup = this.formBuilder.group({
      full_name: '',
      mobile: '',
      pincode: '',
      locality: '',
      address: '',
      landmark: '',
      alternative_mobile: '',
      add_type: 1
    })
  }
  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void{
    this.create = false;
    this.apiService.getLocationByPincode(this.address.pincode.pincode).subscribe(
      data => {
        this.selectedCity = data[0].city.city_name;
        this.selectedState = data[0].city.state.state_name
      }, error => {
        console.log(error)
      }
    )
    this.addressFormGroup.patchValue({
      full_name: this.address.full_name,
      mobile: this.address.mobile,
      pincode: this.address.pincode.pincode,
      locality: this.address.locality,
      address: this.address.address,
      landmark: this.address.landmark,
      alternative_mobile: this.address.alternative_mobile,
      add_type: this.address.add_type
    })
  }
  
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

  onAddressUpdate() {
    this.snackbar = document.getElementById("snackbar");
    this.buyerApi.updateAddress(this.address.id, this.addressFormGroup.value).subscribe(
      data => {
        this.snackbar.innerText = "Address Updated."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
        window.location.reload(true);        
      }, error => {
        this.snackbar.innerText = "Please Try  Again."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    )
  }

}
