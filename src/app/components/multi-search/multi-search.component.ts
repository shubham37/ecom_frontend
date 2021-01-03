import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-multi-search',
  templateUrl: './multi-search.component.html',
  styleUrls: ['./multi-search.component.css']
})
export class MultiSearchComponent implements OnInit {

  products: Object[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private productApi: ProductService) { 
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
  }

  ngOnInit(): void {
  }

}
