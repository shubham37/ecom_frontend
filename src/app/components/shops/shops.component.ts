import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service'


@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  stores = []

  constructor(private sellerApi: SellerService) { }

  ngOnInit(): void {
  }

  findByPincode(): void {
    this.sellerApi.sellersByPincode('201002').subscribe(
      data => {
        console.log(data)
        this.stores = data
      }, error => {
        console.log(error)
      }
    )
  }

}
