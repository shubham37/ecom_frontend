import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  features : Object[];

  constructor() { 
    this.features = [
      1,2,3
    ];
  }

  ngOnInit(): void {
  }

}
