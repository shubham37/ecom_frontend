import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses : Object[] = [];
  current: Object={};

  constructor(private buyerApi: BuyerService) { 
  }

  ngOnInit(): void {
    this.buyerApi.fetchAddresses().subscribe(
      data => {
        this.addresses = data;
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

  onEdit(address) {
    this.current = address;
  }

}
