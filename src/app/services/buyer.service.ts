import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl') + '/buyer_api';
  }

  // Call after Buyer OTP Verified
  buyerRegistration() : Observable<any> {
    return this.httpClient.get(this.url + '/buyer_signup',this.httpOptions)
  }

  // Call on My Account Componenet Load
  fetchUserDetail() : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_detail/fetch_detail', this.httpOptions)
  }

  // Call on save Personal Detail
  updatePD(firstName, lastName, gender) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/buyer_detail/update_pd/', {
      'first_name': firstName,
      'last_name': lastName,
      'gender': gender
    }, this.httpOptions);
  }

  // Call on Save Email
  updateEmail(email) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/buyer_detail/update_email/', {
      'email': email
    }, this.httpOptions);
  }

  // Call on Save Mobile
  updateMobile(mobile) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/buyer_detail/update_mobile/', {
      'mobile': mobile
    }, this.httpOptions);
  }



  // Call On Addresses Component
  fetchAddresses() : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_address', this.httpOptions)
  }

  // Call to see particular Address
  fetchAddress(address_id) : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_address/'+address_id, this.httpOptions)
  }

  // Call on submit address template compnent
  addAddress(address): Observable<any> {
    return this.httpClient.post<any>(this.url+'/buyer_address/', {
      address
    }, this.httpOptions)
  }

  // Call on submit address template compnent if No data
  updateAddress(id,address): Observable<any> {
    return this.httpClient.put<any>(this.url+'/buyer_address/'+ id+ '/', {
      address
    }, this.httpOptions)
  }

  // Call on delete an address
  deleteAddress(id): Observable<any> {
    return this.httpClient.delete<any>(this.url+'/buyer_address/'+ id, this.httpOptions)
  }

  fetchcards() : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_card', this.httpOptions)
  }

  fetchcard(card_id) : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_card/'+card_id, this.httpOptions)
  }

  addcard(card): Observable<any> {
    return this.httpClient.post<any>(this.url+'/buyer_card/', {
      card
    }, this.httpOptions)
  }

  deletecard(id): Observable<any> {
    return this.httpClient.delete<any>(this.url+'/buyer_card/'+ id, this.httpOptions)
  }

  // Fetch Wishlist of user on account
  fetchWishlist() : Observable<any> {
    return this.httpClient.get(this.url+'/buyer_wishlist', this.httpOptions)
  }

  // click on add wishlist button on any product
  addWishlist(product_id): Observable<any> {
    return this.httpClient.post<any>(this.url+'/buyer_wishlist/add/', {
      "product_id":product_id
    }, this.httpOptions)
  }

  deleteWishlist(proId): Observable<any> {
    return this.httpClient.delete<any>(this.url+'/buyer_wishlist/'+ proId, this.httpOptions)
  }

  isInYourWishlist(proId): Observable<any> {
    return this.httpClient.get<any>(this.url+'/buyer_wishlist/'+ proId+ '/isYour', this.httpOptions)
  }

}