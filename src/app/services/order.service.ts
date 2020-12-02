import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ localStorage.getItem('token')
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl') + '/order_api';
  }

  orderPlace(orderDetail) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/order_place/',{
      orderDetail
    })
  }

  fetchOrders() : Observable<any> {
    return this.httpClient.get(this.url+'/orders', this.httpOptions)
  }

  fetchOrder(id) : Observable<any> {
    return this.httpClient.get(this.url+'/orders/'+id, this.httpOptions)
  }

  writeOrderReview(id, comment, rating) : Observable<any> {
    return this.httpClient.post<any>(this.url+'/orders/'+id, {
      'comment': comment,
      'rating': rating
    }, this.httpOptions)
  }

}
