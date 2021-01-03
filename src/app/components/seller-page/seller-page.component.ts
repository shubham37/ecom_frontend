import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {
  categories = [1,2,3,1,2,3]
  products: Object[] = [];

  constructor(private productApi: ProductService) { }

  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  ngOnInit(): void {
    this.productApi.fetchPopularViewed().subscribe(
      data => {
        this.products = data.viewed;
      },
      error => {
        console.log(error);
      }
    )

  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 300;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 300;
  }
  counter(i: number) {
    return new Array(i);
  }

}
