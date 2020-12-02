import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  formGroup;
  cart = 0;

  constructor(private route: Router, private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      query: '',
    });
  }

  ngOnInit(): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart != null && cart !=undefined) {
      this.cart = cart.length;
    }

  }

  onSearch(searchData) {
    var query = searchData['query'];
    console.log(this.route);
    window.location.href = '/search?value=' + query;
    // this.route.navigate(['/search'], { queryParams: { value: query } });
  }

}
