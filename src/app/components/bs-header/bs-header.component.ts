import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from '@ngx-translate/core'

import { ApiService } from '../../services/api.service';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BsHeaderComponent implements OnInit {

  loginFormGroup;
  loginOtpFormGroup;
  registerFormGroup;
  registerOtpFormGroup;
  snackbar: any;

  public isLoggedIn: boolean = false;
  
  public isLoginBlockToggle: boolean = true;
  public isLoginOtpBlock: boolean = false;
  public isRegisterBlockToggle: boolean = true;
  public isRegisterOtpBlock: boolean = false;
  
  public isROTPsend: boolean = false;
  public isLOTPsend: boolean = false;
  
  


  constructor(private formBuilder: FormBuilder, private config: ConfigService, public translate: TranslateService, 
    private api: ApiService, private buyerApi: BuyerService) { 
    translate.addLangs(['EN','BN','HI','TE','TA','GU']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/EN|BN|HI|TE|TA|GU/) ? browserLang : 'EN');
    } else {
      localStorage.setItem('locale', 'EN');
      translate.setDefaultLang('EN');
    }

    this.loginFormGroup = this.formBuilder.group({
      login_input: '',
      password_input: ''
    })

    this.loginOtpFormGroup = this.formBuilder.group({
      login_otp: ''
    })

    this.registerFormGroup = this.formBuilder.group({
      email: '',
      password: '',
      mobile: ''
    })

    this.registerOtpFormGroup = this.formBuilder.group({
      register_otp: ''
    })
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
    window.location.reload(true);
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token && token != null && token != undefined) {
      this.isLoggedIn = true;
    }
    this.snackbar = document.getElementById("snackbar");
  }

  onSelectLanguage(language: string) {
    localStorage.setItem('locale', language);
    window.location.reload();
  }

  sendOtp() {
    this.isLOTPsend = true;
    var user_input = this.loginFormGroup.value.login_input;
    this.api.sendLoginOTP(user_input).subscribe(
      data => {
        this.isLOTPsend = false;
        this.snackbar.innerText = "Otp has been send successfully."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);

        localStorage.setItem('otp', data.OTP);
        localStorage.setItem('token', data.token);
        this.isLoginBlockToggle = false;
      },
      error => {
        this.isLOTPsend = false;
        this.snackbar.innerText =  error.message
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    );
  }

  login(emailData) {
    this.api.login(emailData).subscribe(
      data => {
        this.snackbar.innerText =  "Logged In Successfully"
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_verified', '1');
        window.location.reload(true);
      }, error => {
        this.snackbar.innerText =  error.message
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    )    
  }


  sendRegisterOtp(emailData) {
    this.isROTPsend = true;
    // var user_input = emailData['register_input'];
    this.api.sendRegisterOTP(emailData).subscribe(
      data => {
        this.isROTPsend = false;
        this.snackbar.innerText =  "Otp has been send successfully."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
        localStorage.setItem('token', data.token);
        localStorage.setItem('otp', data.OTP);
        this.isRegisterBlockToggle = false;
      },
      error => {
        this.isROTPsend = false;
        this.snackbar.innerText =  error.message
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    );
  }


  varifyLoginOtp(otpData) {
    var otp = otpData['login_otp'];
    var local_otp =localStorage.getItem('otp');
    if (local_otp && local_otp != null && local_otp != undefined && local_otp == otp) {
      localStorage.removeItem('otp');
      localStorage.setItem('user_verified', '1');
      this.snackbar.innerText =  "Logged In successfully."
      this.snackbar.className = "show";
      setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      window.location.reload(true);
    } else {
      localStorage.removeItem('otp');
      this.snackbar.innerText =  "Otp is not matched. Please re-send."
      this.snackbar.className = "show";
      setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
    }
  }

  varifyRegisterOtp(otpData) {
    var otp = otpData['register_otp'];
    var local_otp =localStorage.getItem('otp');
    if (local_otp && local_otp != null && local_otp != undefined) {
      if (local_otp == otp) {
        this.buyerApi.buyerRegistration().subscribe(
          data => {
            this.snackbar.innerText =  "Successfully Registered"
            this.snackbar.className = "show";
            setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
            localStorage.removeItem('email');
            localStorage.removeItem('otp');
            localStorage.setItem('user_verified', '1');
            window.location.reload(true);
          },
          error => {
            this.snackbar.innerText =  error.message
            this.snackbar.className = "show";
            setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
          }
        )
      } else {
        this.snackbar.innerText =  "Otp is not matched. Please re-send."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    } 
  }

}
