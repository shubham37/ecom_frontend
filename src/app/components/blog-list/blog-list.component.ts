import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Object[] = [];
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
    this.blogApi.GetBlogs().subscribe(
      data => {
        this.blogs = data;
      },
      error => {
        console.log(error.message);
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
