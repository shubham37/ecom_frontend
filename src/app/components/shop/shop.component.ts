import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { ApiService } from '../../services/api.service'


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public isInfoShow: boolean=true;
  public isBusinessShow: boolean=false;
  public isBankShow: boolean=false;
  pancard : File = null;
  adharcard: File = null;
  logo: File = null;
  board: File = null;
  pincode_file: File = null;
  proof: File = null;

  isPorceessing : boolean = false;

  formGroup : FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private sellerApi: SellerService, private api: ApiService) { 
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userid: new FormControl('', [Validators.required]),
      shop_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cnf_password: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
 
      gst: new FormControl('', [Validators.required]),
      role: new FormControl(1, [Validators.required]),
      minimum_order: new FormControl(0, [Validators.required]),
      category: new FormControl(1, [Validators.required]),
      pincodes: new FormControl('', [Validators.required]),
 
      ifsc: new FormControl('', [Validators.required]),
      bank_city: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      account_holder: new FormControl('', [Validators.required]),
      account_number: new FormControl('', [Validators.required]),
      bank: new FormControl('', [Validators.required]),
    })
    this.isInfoShow = true;
    this.isBusinessShow = false;
    this.isBankShow  = false;
  }

  showInfoBlock() {
    this.isInfoShow = true;
    this.isBusinessShow = false;
    this.isBankShow = false;
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

  onZipChange(zip_code: any) : void {
    if (zip_code.length == 6) {
      this.api.getLocationByPincode(zip_code).subscribe(
        data => {
          this.formGroup.get('city').setValue('Ghaziabad');
          this.formGroup.get('state').setValue('UP');
        }, error => {
          console.log(error);
        }
      )
    }
  }

  onPanChange(event: any) : void {
    if (event.target.files.length > 0) {
      this.pancard = event.target.files[0];
    }
  }

  onAdharChange(event: any)  : void {
    if (event.target.files.length > 0) {
      this.adharcard = event.target.files[0];
    }

  }

  onPincodeFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.pincode_file = event.target.files[0];
    }
  }

  onLogoChange(event: any) : void {
    if (event.target.files.length > 0) {
      this.logo = event.target.files[0];
    }

  }

  onBoardChange(event: any) : void {
    if (event.target.files.length > 0) {
      this.board = event.target.files[0];
    }

  }

  onProofChange(event: any) {
    if (event.target.files.length > 0) {
      this.proof = event.target.files[0];
    }
  }

  prepare_pincodes(pincodes: string): string {
    let final =''
    pincodes.split(',').forEach(function(item) {
      final = final.concat(',',item.trim())
    })
    return final
  }
  
  onBankSubmit() {
    this.isPorceessing = true;
    var x = document.getElementById("snackbar");

    if (this.formGroup.valid ) {
  
      if (this.pancard != null && this.adharcard != null && 
        this.logo != null && this.board != null && this.proof != null ) {
          
          if (this.formGroup.value.password === this.formGroup.value.cnf_password) {
            let pincodes=''
            if (this.formGroup.value.pincodes) {
              pincodes = this.prepare_pincodes(this.formGroup.value.pincodes)
              console.log(pincodes);
            }

            const uploadData = new FormData();

            uploadData.append('pancard', this.pancard, this.pancard.name)
            uploadData.append('adharcard', this.adharcard, this.adharcard.name)
            uploadData.append('logo', this.logo, this.logo.name)
            uploadData.append('board', this.board, this.board.name)
            if (this.pincode_file != null) {
              uploadData.append('pincode_file', this.pincode_file, this.pincode_file.name)
            } else {
              uploadData.append('pincode_file', '')
            }
            uploadData.append('proof', this.proof, this.proof.name)
        
            uploadData.append('email', this.formGroup.value.userid)
            uploadData.append('phone', this.formGroup.value.phone)
            uploadData.append('password', this.formGroup.value.password)        
            uploadData.append('shop_name', this.formGroup.value.shop_name)
            uploadData.append('address', this.formGroup.value.address)
            uploadData.append('city', this.formGroup.value.city)
            uploadData.append('zip_code', this.formGroup.value.zip_code)
            uploadData.append('state', this.formGroup.value.state)
            uploadData.append('gst', this.formGroup.value.gst)
            uploadData.append('role', this.formGroup.value.role)
            uploadData.append('minimum_order', this.formGroup.value.minimum_order)
            uploadData.append('category', this.formGroup.value.category)
            uploadData.append('pincodes', pincodes)
            uploadData.append('ifsc', this.formGroup.value.ifsc)
            uploadData.append('bank_city', this.formGroup.value.bank_city)
            uploadData.append('branch', this.formGroup.value.branch)
            uploadData.append('account_holder', this.formGroup.value.account_holder)
            uploadData.append('account_number', this.formGroup.value.account_number)
            uploadData.append('bank', this.formGroup.value.bank)

            this.sellerApi.sellerRegistration(uploadData).subscribe(
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
          } else {
            this.isPorceessing = false;
            x.innerText = "Password and Confirm Password Should Be Same "
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
          }
      } else {
        this.isPorceessing = false;
        x.innerText = "Any File Mmissing Plase Check"
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    } 
    else {
      console.log(this.formGroup.errors)
      this.isPorceessing = false;
      x.innerText = "Please Check Detail"
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  }
}
