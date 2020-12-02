import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl') + '/api';
  }

  // Call on Login and Buyer OTP
  sendLoginOTP(email): Observable<any> {
    return this.httpClient.post<any>(this.url + '/login_otp/', {'email': email});
  }

  sendRegisterOTP(registerData): Observable<any> {
    return this.httpClient.post<any>(this.url + '/register_otp/', {registerData});
  }


  // Call after Login OTP Verified
  login(emailData): Observable<any> {
    return this.httpClient.post<any>(this.url + '/login/', {emailData});
  }

  // Call on Subscribe an email
  SubscribeNewsletter(email) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/subscribe/', {'email': email});
  }

  // Call on submit Contact Form
  customerQuery(contactData): Observable<any> {
    return this.httpClient.post<any>(this.url + '/customer_query/', {
      contactData
    });
  }

  // Get State List in Drop down in Seller registration or address
  getStates(): Observable<any> {
    return this.httpClient.get(this.url + '/state')
  }

  // Get State List in Drop down in Seller registration or address
  getCities(): Observable<any> {
    return this.httpClient.get(this.url + '/city')
  }

  // Get State List in Drop down in Seller registration or address
  getPincodes(): Observable<any> {
    return this.httpClient.get(this.url + '/pincode')
  }

  // Get State List in Drop down in Seller registration or address
  getCitiesUnderState(state): Observable<any> {
    return this.httpClient.get(this.url + '/city/'+state+'/get_cities_by_state')
  }

  // Get State List in Drop down in Seller registration or address
  getLocationByPincode(pincode): Observable<any> {
    return this.httpClient.post<any>(this.url + '/pincode/get_location_by_pincode/', {
      pincode: pincode
    })
  }

  // getLocationByPincode(pincode): Observable<any> {
  //   return this.httpClient.post<any>(this.url + '/pincode/'+city+'/get_pincodes_by_city')
  // }

}
