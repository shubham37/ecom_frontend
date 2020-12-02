import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
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
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  public products: Object[];
  public query : string = '';
  
  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private productApi: ProductService) { 
    this.query = this.route.snapshot.queryParams.value;
    this.productApi.SearchQuery(this.query).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
    
    this.products = [
      1,2,3,4
    ]
    if (this.products.length <= 1) {
      this.router.navigate(['/product/'+1])
    }
    console.log(this.route.snapshot.queryParams);
  }

  ngOnInit(): void {
  }

}
