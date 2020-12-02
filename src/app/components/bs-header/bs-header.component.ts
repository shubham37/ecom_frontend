import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from '@ngx-translate/core'

import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  public isLoggedIn: boolean = false;

  public isLoginBlockToggle: boolean = true;
  public isLoginOtpBlock: boolean = false;
  public isRegisterBlockToggle: boolean = true;
  public isRegisterOtpBlock: boolean = false;

  public isROTPsend: boolean = false;
  public isLOTPsend: boolean = false;

  public loginMessage: String = '';
  public loginOtpMessage: String = '';
  public registerMessage: String = '';
  public registerOtpMessage: String = '';



  constructor(private formBuilder: FormBuilder, private config: ConfigService, public translate: TranslateService, 
    private api: ApiService, private buyerApi: BuyerService, private snackbar: MatSnackBar) { 
    translate.addLangs(['EN','BN','HI','TE','TA','GU']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      console.log(browserLang);
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
        this.loginOtpMessage = 'Otp has been send successfully.'
        console.log(data);
        localStorage.setItem('otp', data.OTP);
        localStorage.setItem('token', data.token);
        this.isLoginBlockToggle = false;
      },
      error => {
        this.isLOTPsend = false;
        this.loginMessage = 'Please Check Email or Try Again Later.'
        console.log(error);
      }
    );
  }

  login(emailData) {
    this.api.login(emailData).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_verified', '1');
        window.location.reload(true);
      }, error => {
        console.log(error);
      }
    )    
  }


  sendRegisterOtp(emailData) {
    this.isROTPsend = true;
    // var user_input = emailData['register_input'];
    this.api.sendRegisterOTP(emailData).subscribe(
      data => {
        this.registerOtpMessage = 'Otp has been send successfully.'
        console.log(data);
        // localStorage.setItem('email', user_input);
        // localStorage.setItem('password', user_input);
        localStorage.setItem('token', data.token);
        localStorage.setItem('otp', data.OTP);
        this.isROTPsend = false;
        this.isRegisterBlockToggle = false;
      },
      error => {
        this.isROTPsend = false;
        this.registerMessage = 'Please Check Email or Try Again Later.'
        // localStorage.removeItem('email');
        // localStorage.removeItem('otp');
        console.log(error);
      }
    );
  }


  varifyLoginOtp(otpData) {
    var otp = otpData['login_otp'];
    var local_otp =localStorage.getItem('otp');
    if (local_otp && local_otp != null && local_otp != undefined && local_otp == otp) {
      localStorage.removeItem('otp');
      localStorage.setItem('user_verified', '1');
      // this._snackBar.open("message", "action", {
      //   duration: 2000,
      // });
      window.location.reload(true);
    } else {
      localStorage.removeItem('otp');
      this.loginMessage = "Otp is not matched. Please re-send."
    }
  }

  varifyRegisterOtp(otpData) {
    var otp = otpData['register_otp'];
    var local_otp =localStorage.getItem('otp');
    if (local_otp && local_otp != null && local_otp != undefined) {
      if (local_otp == otp) {
        console.log(local_otp)
        this.buyerApi.buyerRegistration().subscribe(
          data => {
            // this._snackBar.open("message", "action", {
            //   duration: 2000,
            // });
            localStorage.removeItem('email');
            localStorage.removeItem('otp');
            localStorage.setItem('user_verified', '1');
            window.location.reload(true);
          },
          error => {
            this.registerMessage = 'Please send again.'
            console.log(error);
          }
        )
      } else {
        this.registerMessage = 'OTP is not matched. Please not send.'
      }
    } 
  }

}
