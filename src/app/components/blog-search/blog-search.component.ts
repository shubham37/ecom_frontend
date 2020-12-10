import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css']
})
export class BlogSearchComponent implements OnInit {
  query: String;
  blogs: Object[];

  constructor(private blogApi: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams.value;
    this.blogApi.GetBlogsBySearchAndTag(this.query).subscribe(
      data => {
        if (data != null && data != undefined) {
          this.blogs=data;
        } else {
          this.blogs = [];
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
