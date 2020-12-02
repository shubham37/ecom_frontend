import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  public isShop: boolean;
  public categories: Object[];

  constructor(private productApi: ProductService) { 
    console.log("inside manu");
    if (localStorage.getItem("shop_registered")) {
      this.isShop = true;
    } else {
      this.isShop = false;
    }
  }

  ngOnInit(): void {
    this.productApi.fetchCategories().subscribe(
      data => {
        console.log(data);
        this.categories = data.categories;
      },
      error => {
        console.log(error);
        this.categories = [];
      }
    )
  }

}
