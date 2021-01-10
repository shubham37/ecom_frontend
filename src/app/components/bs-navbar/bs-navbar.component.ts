import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  formGroup;
  cart = 0;
  dataRefresher : any;

  constructor(private route: Router, private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      query: '',
    });
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();
  }

  getData() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      this.cart = cart.length;
    }
  }

  refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.getData();
      }, 3000);
  }

  onSearch(searchData) {
    var query = searchData['query'];
    if (query.includes(',')) {
      window.location.href = '/multi_search?value=' + query;
    } else {
      window.location.href = '/search?value=' + query;
    }
  }

}
