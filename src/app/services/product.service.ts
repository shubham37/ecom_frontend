import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike, throwError } from 'rxjs';
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

  SearchQuery(options: string) : Observable<any> {
    return this.httpClient.get(this.url + '/search', {'params': {'values':options}}
    );
  }

  searchMultiProducts(options: string) : Observable<any> {
    return this.httpClient.get(this.url + '/multi_search', {'params': {'values':options}}
    );
  }

  fetchShippingOptions(product: string): Observable<any> {
    return this.httpClient.get(this.url + '/shipping_option/'+ product);
  }

  fetchProduct(id: string) : Observable<any> {
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

  fetchSubcategoryFromCategory(cat_id: string) : Observable<any> {
    return this.httpClient.get(this.url + '/sub_category/'+ cat_id +'/get_subcategory_by_category')
  }

  fetchProducts(options: any) : Observable<any> {
    return this.httpClient.get(this.url + '/search', {'params': options});
  }

  fetchCategoryByName(cat: any) : Observable<any> {
    return this.httpClient.get(this.url + '/category/byName', {'params': {'name': cat}})
  }

  fetchProductsByCategory(params: any) : Observable<any> {
    return this.httpClient.get(this.url + '/products/byCategory', {'params': params});
  }

  fetchSubCategoryByCategory(cat: any) : Observable<any> {
    return this.httpClient.get(this.url + '/sub_category/byCategory', {'params': {'name': cat}});
  }

  writeReview(proId: any, details: any) : Observable<any> {
    return this.httpClient.post<any>(this.url+'/review/', {
      'product_id': proId,
      'detail': details
    }, this.httpOptions)
  }

  preparingFilters(key:any, value: any, applied_filters: any) : Observable<any>{
    const checkKeyExistence = applied_filters.some( (filter: { key: any; }) => filter.key == key)
    if (checkKeyExistence) { // Is Filter Already Exist
      if (key == value) {
        // remove existing filter
        applied_filters = applied_filters.filter((item: any) => item.key != key)
      } else {
        // Update Value of Existing Filter
        applied_filters.forEach((feature: { key: any; value: any; }) => {
          if (feature.key == key) {
            feature.value = value
          }
        })
      }
    } else { // Its New Filter
      applied_filters.push(
        {
          key: key,
          value: value
        }
      )
    }
    return applied_filters
  }

  applyFilter(all_products: any, applied_filters: any) : Observable<any>{
    let return_products : any= [];

    if (applied_filters.length == 0) {
      return all_products
    }
    // Now Applied Final Filters on Products
    all_products.forEach((product: any) => {
      if (product.features.length >= applied_filters.length) { //Products Has Atleast One Feature
        let is_consider = true;
        applied_filters.forEach((filter: any) => {
          let output = product.features.find((e:any) => e.value === filter.value)
          if (output == undefined) {
            is_consider = false;
          }
        })

        if (is_consider) {
          return_products.push(product);
        }
      }
    })
    return return_products
  }
}
