import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-template',
  templateUrl: './shop-template.component.html',
  styleUrls: ['./shop-template.component.css']
})
export class ShopTemplateComponent implements OnInit {

  @Input() store: any;

  constructor() { }

  ngOnInit(): void {
  }

}
