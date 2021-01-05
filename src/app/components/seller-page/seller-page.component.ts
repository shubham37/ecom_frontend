import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SellerService } from '../../services/seller.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {
  categories = [1,2,3,1,2,3]
  store: Object={};

  constructor(private productApi: ProductService, private sellerApi: SellerService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  ngOnInit(): void {
    this.sellerApi.sellerStore(this.route.snapshot.params.identifier).subscribe(
      data => {
        this.store = data;
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
