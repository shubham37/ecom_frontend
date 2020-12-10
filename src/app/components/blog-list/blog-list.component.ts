import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';


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
        this.blogs = data;
      },
      error => {
        console.log(error.message);
      }      
    )

  }

}
