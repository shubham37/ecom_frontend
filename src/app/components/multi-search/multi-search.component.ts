import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../services/product.service';
import { ConfigService } from '../../services/config.service'


@Component({
  selector: 'app-multi-search',
  templateUrl: './multi-search.component.html',
  styleUrls: ['./multi-search.component.css']
})
export class MultiSearchComponent implements OnInit {

  products: any = [];
  query: string = '';
  sorting_options = []

  constructor(private route: ActivatedRoute, private router: Router, private configApi: ConfigService, private productApi: ProductService) { 
    this.query = this.route.snapshot.queryParams.value;
    this.productApi.searchMultiProducts(this.query).subscribe(
      data => {
        if (data != null){
          this.products = data
        }
      },
      error => {
        console.log(error);
      }
    );

    this.sorting_options = this.configApi.get('sorting_options')

  }

  ngOnInit(): void {
  }

  onChange(sort_option: string) {
    if (this.products.length > 0) {
      if (sort_option === '0') {
        this.products.sort((a: any, b: any) => (a.rating > b.rating) ? 1 : -1)
      } else if (sort_option === '1') {
        this.products.sort((a: any, b: any) => (a.date_added < b.date_added) ? 1 : -1)
      } else if (sort_option === '2') {
        this.products.sort((a: any, b: any) => (a.mrp > b.mrp) ? 1 : -1)
      } else if (sort_option === '3') {
        this.products.sort((a: any, b: any) => (a.mrp < b.mrp) ? 1 : -1)
      } else if (sort_option === '4') {
        this.products.sort((a: any, b: any) => (a.title > b.title) ? 1 : -1)
      } else {
        this.products.sort((a: any, b: any) => (a.title < b.title) ? 1 : -1)
      }
    }
  }

}
