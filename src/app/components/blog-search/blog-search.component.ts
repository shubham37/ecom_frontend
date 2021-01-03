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
  config: any;

  constructor(private blogApi: BlogService, private router: Router, private route: ActivatedRoute) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 1,
      totalItems:0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 
    );

  }

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

  pageChange(newPage: number) {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams); 
    urlParameters.page = newPage;
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: urlParameters }).then(
      () => console.log('in')
    );
  }

}
