import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { ApiService } from '../../services/api.service'

declare const L: any;

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

  // public final_pincodes: any= [];

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
      pincodes: new FormControl([], [Validators.required]),
 
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
      marker.bindPopup("You Are here.").openPopup()
      // console.warn(position.coords.latitude)
      // console.warn(position.coords.longitude)
    })
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
  
  isValidCSVFile(file: any) {  
    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx")){
      return true;
    }
    return false;
  } 


  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    let pin = fileLoadedEvent.target.result.replaceAll('\r\n', ',').replace('pincode,','')
    localStorage.setItem('pincodes', pin)
  }

  onFileError() {
    alert('Please Check FIle Content.')
  }

  onPincodeFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.pincode_file = event.target.files[0];          
      if (this.isValidCSVFile(this.pincode_file)) {
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;
        fileReader.onerror = this.onFileError;
        fileReader.readAsText(this.pincode_file, "UTF-8");
      } else {
        alert("Please import valid .csv file.");  
      }
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
  
  onBankSubmit() {
    this.isPorceessing = true;
    var x = document.getElementById("snackbar");

    if (this.formGroup.valid ) {

      if (this.pancard != null && this.adharcard != null && 
        this.logo != null && this.board != null && this.proof != null ) {
          if (this.formGroup.value.password === this.formGroup.value.cnf_password) {
            let final_pincodes =  localStorage.getItem('pin')
            localStorage.removeItem('pin');
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
            uploadData.append('pincodes', this.formGroup.value.pincodes)
            if (final_pincodes && final_pincodes != null && final_pincodes != undefined) {
              uploadData.append('pincodes_file', final_pincodes)
            }
            uploadData.append('pincodes_file', '')
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
      this.isPorceessing = false;
      x.innerText = "Please Check Detail"
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  }
}