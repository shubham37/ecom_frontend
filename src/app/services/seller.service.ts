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
  sellerRegistration(info, business, bank, formData) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/register/',{
      'info':info, "business":business, "bank":bank, "form": formData
    })
  }

}
