import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-categorical',
  templateUrl: './categorical.component.html',
  styleUrls: ['./categorical.component.css']
})
export class CategoricalComponent implements OnInit {
  category: any= null;
  all_products: Object[] = [];
  products: Object[] = [];
  filters: any=[];
  applied_filters: any=[];
  sub_categories: Object[] = [];
  config: any;
  sorting_options = []

  constructor(private productApi: ProductService, private  configApi: ConfigService, private router: Router, private route: ActivatedRoute) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 
    );

    this.sorting_options = this.configApi.get('sorting_options')
  }

  ngOnInit(): void {
    let cat = this.route.snapshot.queryParams.category
    this.productApi.fetchCategoryByName(cat).subscribe(
      data => {
        this.category = data;
      }, error => {
        console.log(error)
      }
    )

    this.getData();

    this.productApi.fetchSubCategoryByCategory(cat).subscribe(
      data => {
        this.sub_categories = data;
      }, error => {
        console.log(error)
      }
    )
  }

  getData(): void {
    this.productApi.fetchProductsByCategory(this.route.snapshot.queryParams).subscribe(
      data => {
        if (data != null) {
          this.products = data.products;
          this.all_products = data.products;
          this.filters = data.filters;
        } else {
          this.all_products = []
          this.products = []
          this.filters = []
        }
      }, error => {
        console.log(error)
      }
    )
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

  onChooseSubCategory(sub_category: string): void {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams); 
    if (sub_category != 'all') {
      urlParameters.sub_category = sub_category;
    } else {
      delete urlParameters.sub_category
    }
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: urlParameters }).then(
      () => this.getData()
    );
  }

  onFilterChoose(key: any, value: any) {
    let filters = this.productApi.preparingFilters(key, value, this.applied_filters)
    let pros = this.productApi.applyFilter(this.all_products, filters)
    this.products = Object.assign([], pros);
    this.applied_filters = Object.assign([], filters);
  }

}
