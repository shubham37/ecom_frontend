import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses : Object[] = [];

  constructor(private buyerApi: BuyerService) { 
  }

  ngOnInit(): void {
    this.buyerApi.fetchAddresses().subscribe(
      data => {
        this.addresses = data;
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    )
  }

  onDelete(id) {
    this.buyerApi.deleteAddress(id).subscribe(
      data => {
        window.location.reload(true);
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
