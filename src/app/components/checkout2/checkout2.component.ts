import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css']
})
export class Checkout2Component implements OnInit {
  numbers : Object[];
  
  constructor() { 
    this.numbers = [
      1,2,3
    ]
  }

  ngOnInit(): void {
  }

}
