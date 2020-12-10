import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  numbers : Object[];
  product = {};

  constructor(private route: ActivatedRoute, private productApi: ProductService) { 
    this.numbers = [
      1,2,3,4
    ]
  }

  ngOnInit(): void {
    this.productApi.fetchProduct(this.route.snapshot.params.id).subscribe(
      data => {
        this.product = data;
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    )
  }

  showModal(image) {
    var imageBlock = document.getElementById('productImage');
    if (imageBlock.childNodes.length > 0) {
      imageBlock.removeChild(imageBlock.childNodes[0]);
    }
    var img = document.createElement('img'); 
    img.src =  'http://localhost:8000' + image;
    img.style.height = '100%';
    img.style.width = '100%';
    imageBlock.appendChild(img);
  }

}
