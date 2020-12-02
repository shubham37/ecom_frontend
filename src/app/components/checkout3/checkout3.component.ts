import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout3',
  templateUrl: './checkout3.component.html',
  styleUrls: ['./checkout3.component.css']
})
export class Checkout3Component implements OnInit {
  numbers : Object[];

  constructor() { 
    this.numbers = [
      1,2,3
    ];
  }

  ngOnInit(): void {
  }

}
