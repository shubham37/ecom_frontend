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
    }, this.httpOptions)
  }

  fetchOrders() : Observable<any> {
    return this.httpClient.get(this.url+'/orders', this.httpOptions)
  }

  fetchOrder(orderId: string) : Observable<any> {
    return this.httpClient.get(this.url+'/orders/'+ orderId+ '/order_detail', this.httpOptions)
  }

  writeOrderReview(orderId, comment, rating) : Observable<any> {
    return this.httpClient.post<any>(this.url+'/orders/add_order_review/', {
      'orderId': orderId,
      'comment': comment,
      'rating': rating
    }, this.httpOptions)
  }

  removeOrderDetails(): void {
    localStorage.removeItem("shipping_address");
    localStorage.removeItem("is_shipping_same");
    localStorage.removeItem("billing_address");
    localStorage.removeItem("shipping_option");
    localStorage.removeItem("cart");
    localStorage.removeItem("is_cod");
    localStorage.removeItem("is_online");
  }

  generatePaymentData(amount) : Observable<any> {
    return this.httpClient.get(this.url+'/payment', this.httpOptions)
  }

}
