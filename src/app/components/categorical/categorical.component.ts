import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-categorical',
  templateUrl: './categorical.component.html',
  styleUrls: ['./categorical.component.css']
})
export class CategoricalComponent implements OnInit {
  category: any= null;
  products: Object[] = [];
  sub_categories: Object[] = [];
  config: any;

  constructor(private productApi: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 1,
      totalItems:0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 
    );
  }

  ngOnInit(): void {
    this.productApi.fetchCategoryByName(this.route.snapshot.params.cat).subscribe(
      data => {
        this.category = data;
        console.log(data)
      }, error => {
        console.log(error)
      }
    )

    this.productApi.fetchProductsByCategory(this.route.snapshot.params.cat).subscribe(
      data => {
        this.products = data;
        console.log(data)
      }, error => {
        console.log(error)
      }
    )

    this.productApi.fetchSubCategoryByCategory(this.route.snapshot.params.cat).subscribe(
      data => {
        this.sub_categories = data;
        console.log(data)
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


}
