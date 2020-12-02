import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public experts : Object[];

  constructor() { 
    this.experts = [
      1,2,3,4
    ]
  }

  ngOnInit(): void {
  }

}
