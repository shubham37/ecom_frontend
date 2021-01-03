import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'blog-side',
  templateUrl: './blog-side.component.html',
  styleUrls: ['./blog-side.component.css']
})
export class BlogSideComponent implements OnInit {
  formGroup;
  blogs: Object[]= [];

  constructor(private blogApi: BlogService, private formBuilder: FormBuilder, private router: Router) { 
    this.formGroup = this.formBuilder.group({
      blog_query: '',
    });
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

  onSearch(searchData) {
    var query = searchData['blog_query'];

    window.location.href = '/blogs/search?value=' + query
    // this.router.navigate([''], { queryParams: { value: query } }).then(
    //   () => window.location.reload()
    // )
  }

}
