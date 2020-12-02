import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  public subCategories : Object[];
  @Input() category: string;

  constructor(private productApi: ProductService) { }

  ngOnInit(): void {
    this.productApi.fetchSubcategoryFromCategory(this.category).subscribe(
      data => {
        this.subCategories = data;
        console.log(data);
      },
      error => {
        console.log(error);
        this.subCategories = [];
      }
    )
  }

}
