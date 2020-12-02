import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  numbers : Object[];
  blogs: Object[];

  constructor(private blogApi: BlogService) { 
    this.blogs = []
  }

  ngOnInit(): void {
    this.blogApi.GetBlogs().subscribe(
      data => {
        console.log(data);
        this.blogs = data;
      },
      error => {
        console.log(error.message);
      }      
    )

  }

}
