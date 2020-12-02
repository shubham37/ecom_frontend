import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BlogService } from '../../services/blog.service';
import { BuyerService } from '../../services/buyer.service';
import { OrderService } from '../../services/order.service';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'blog-column',
  templateUrl: './blog-column.component.html',
  styleUrls: ['./blog-column.component.css']
})
export class BlogColumnComponent implements OnInit {
  numbers : Object[];
  blog: {};
  formGroup;

  constructor(private formBuilder: FormBuilder, private blogApi: BlogService, private route: ActivatedRoute) { 
    this.formGroup = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      comment: '',
    });
    this.numbers = [1,2,3];
  }

  ngOnInit(): void {
    this.blogApi.GetBlog(this.route.snapshot.params.blogid).subscribe(
      data => {
        this.blog = data;
        console.log(this.blog)
      },
      error => {
        console.log(error);
      }
    )
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  
  onSubmit(reviewData) {
    this.blogApi.addBlogReview(this.route.snapshot.params.blogid, reviewData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
    // this.route.navigate(['/search'], { queryParams: { value: 'popular' } });
  }

}
