import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../services/product.service';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  foods: Food[] = [
    {value: '0', viewValue: 'Popularity'},
    {value: '1', viewValue: 'Price Low to High'},
    {value: '2', viewValue: 'Price High to Low'},
    {value: '3', viewValue: 'Newest First'}
  ];
  public products: Object[] = [];
  public query : string = '';
  config: any;
  
  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private productApi: ProductService) { 
    this.query = this.route.snapshot.queryParams.value;
    this.productApi.SearchQuery(this.query).subscribe(
      data => {
        if (data!=null && data.length === 1) {
          this.router.navigate(['/product/'+ data[0].id])
        } else if (data!=null && data.length >= 1) {
          this.products = data
        }
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

}
