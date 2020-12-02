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

  constructor(private productApi: ProductService, private route: ActivatedRoute) { }

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

}
