import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { BlogService } from '../../services/blog.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public numbers : Object[];
  public corosoel: Object[];
  public item: Object[];
  viewedProducts: Object[] = [];
  popularProducts: Object[] = [];

  topCategories: Object[] = [];
  popularCategories:  Object[] = [];

  blogs: Object[] = [];
  
  
  constructor(private cookieService: CookieService, private router: Router, private blogApi: BlogService, private productApi: ProductService) {
    this.corosoel = [1,2,3];
    this.item = [1,2,3,4,5,6,1,2,3,4,5,6];
    this.numbers = [
      1,2,3
    ];
  }

  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  ngOnInit(): void {
    this.cookieService.set('wishlist', 'prod1');
    console.log(this.cookieService.get('wishlist'));

    this.productApi.fetchTopCategories().subscribe(
      data => {
        if (data) {
          this.topCategories = data.top_categories
        }
      }, error => {
        console.log(error.message);
      }
    )

    this.productApi.fetchPopularCategories().subscribe(
      data => {
        if (data) {
          this.popularCategories = data.popular_categories
        }
      }, error => {
        console.log(error.message);
      }
    )

    this.blogApi.GetLatestBlog().subscribe(
      data => {
        this.blogs = data
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )

    this.productApi.fetchPopularViewed().subscribe(
      data => {
        console.log(data)
        this.viewedProducts = data.viewed;
        this.popularProducts = data.popular;
      },
      error => {
        console.log(error);
      }
    )

  }

  chooseCategory(catName) {
    console.log(catName);
    this.router.navigate(["/category/", catName])
  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 300;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 300;
  }
  counter(i: number) {
    return new Array(i);
  }

}
