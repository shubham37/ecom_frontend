import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../services/buyer.service'
import { ConfigService } from '../../services/config.service'


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  numbers : Object[];
  products : Object[] = [];
  collection = [];
  config: any;
  sorting_options = [];

  constructor(private router: Router, private route: ActivatedRoute, private productApi: ProductService, 
    private buyerApi: BuyerService, private configApi: ConfigService) {
    this.numbers = [
      1,2,3
    ];
    this.config = {
      currentPage: 1,
      itemsPerPage: 1,
      totalItems:0
      };
      route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
      
    this.sorting_options = this.configApi.get('sorting_options')

  }

  ngOnInit(): void {
    this.productApi.fetchProductsByCategory(this.route.snapshot.queryParams).subscribe(
      data => {
        this.products = data;
        console.log(data)
      }, error => {
        console.log(error)
      }
    )

    // this.productApi.fetchProducts(this.route.snapshot.queryParams).subscribe(
    //   data => {
    //     this.products = data;
    //     console.log(data)
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    for(let i=1;i<=100;i++){
      let Obj = {'name': `Employee Name ${i}`,'code': `EMP00 ${i}`}
      this.collection.push(Obj);
    }
  
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

}
