import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl') + '/seller_api';
  }

  // Call on submit Seller Registration Form
  sellerRegistration(data: any) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/register/',data)
  }

  sellersByPincode(pincode: any) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/by_pincode/', {'pincode':pincode}, this.httpOptions)
  }

  sellerStore(identifier: any) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/store/', {'identifier': identifier}, this.httpOptions)
  }

  isDelivered(delivery_pincode: any, seller: any) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/is_possible/', {'delivery_pincode': delivery_pincode, 'seller': seller}, this.httpOptions)
  }

}
