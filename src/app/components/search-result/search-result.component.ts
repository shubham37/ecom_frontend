import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public query : string = '';
  all_products: Object[] = [];
  products: Object[] = [];
  filters: any=[];
  applied_filters: any=[];
  config: any;
  sorting_options = [];
  
  constructor(private route: ActivatedRoute, private router: Router, private configApi: ConfigService, private productApi: ProductService) { 
    this.query = this.route.snapshot.queryParams.value;
    this.productApi.SearchQuery(this.query).subscribe(
      data => {
        this.all_products = data.products;
        this.products = data.products
        this.filters = data.filters
        // if (data!=null && data.length === 1) {
        //   this.router.navigate(['/product/'+ data[0].id])
        // } else if (data!=null && data.length >= 1) {
        //   this.products = data
        // }
      },
      error => {
        console.log(error);
      }
    );

    this.config = {
      currentPage: 1,
      itemsPerPage: 1,
      totalItems:0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 
    );
    this.sorting_options = this.configApi.get('sorting_options')

  }

  ngOnInit(): void {
  }

  pageChange(newPage: number) {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams); 
    urlParameters.page = newPage;
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: urlParameters }).then(
      () => console.log('in')
    );
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

  onFilterChoose(key: any, value: any) {
    let filters = this.productApi.preparingFilters(key, value, this.applied_filters)
    let pros = this.productApi.applyFilter(this.all_products, filters)
    this.products = Object.assign([], pros);
    this.applied_filters = Object.assign([], filters);
  }

}
