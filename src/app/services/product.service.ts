import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl')+ '/product_api';
  }

  SearchQuery(options) : Observable<any> {
    return this.httpClient.get(this.url + '/search', {'params': {'values':options}}
    );
  }

  fetchShippingOptions(product): Observable<any> {
    return this.httpClient.get(this.url + '/shipping_option/'+ product);
  }

  fetchProduct(id) : Observable<any> {
    return this.httpClient.get(this.url + '/products/'+ id)
  }

  fetchPopularViewed() : Observable<any> {
    return this.httpClient.get(this.url + '/products/popular_viewed')
  }

  fetchCategories() : Observable<any> {
    return this.httpClient.get(this.url + '/category')
  }

  fetchTopCategories() : Observable<any> {
    return this.httpClient.get(this.url + '/category/top')
  }

  fetchPopularCategories() : Observable<any> {
    return this.httpClient.get(this.url + '/popular_category')
  }

  fetchSubcategoryFromCategory(cat_id) : Observable<any> {
    return this.httpClient.get(this.url + '/sub_category/'+ cat_id +'/get_subcategory_by_category')
  }

  fetchProducts(options) : Observable<any> {
    return this.httpClient.get(this.url + '/search', {'params': options});
  }

  fetchCategoryByName(cat) : Observable<any> {
    return this.httpClient.get(this.url + '/category/byName', {'params': {'name': cat}})
  }

  fetchProductsByCategory(cat) : Observable<any> {
    return this.httpClient.get(this.url + '/products/byCategory', {'params': {'name': cat}});
  }

  fetchSubCategoryByCategory(cat) : Observable<any> {
    return this.httpClient.get(this.url + '/sub_category/byCategory', {'params': {'name': cat}});
  }

}
