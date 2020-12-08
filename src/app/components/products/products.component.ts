import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../services/buyer.service'


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

  constructor(private router: Router, private route: ActivatedRoute, private productApi: ProductService, private buyerApi: BuyerService) {
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
  }

  ngOnInit(): void {
    this.productApi.fetchProducts(this.route.snapshot.queryParams).subscribe(
      data => {
        this.products = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
    for(let i=1;i<=100;i++){
      let Obj = {'name': `Employee Name ${i}`,'code': `EMP00 ${i}`}
      this.collection.push(Obj);
    }
  
  }

  pageChange(newPage: number) {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams); 
    urlParameters.page = newPage;
    this.router.navigate(['/products'], { queryParams: urlParameters }).then(
      () => console.log('in')
    );
  }

}
