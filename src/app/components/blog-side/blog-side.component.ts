import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'blog-side',
  templateUrl: './blog-side.component.html',
  styleUrls: ['./blog-side.component.css']
})
export class BlogSideComponent implements OnInit {
  numbers : Object[];
  formGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.formGroup = this.formBuilder.group({
      blog_query: '',
    });
    this.numbers = [1,2];
  }

  ngOnInit(): void {
  }

  onSearch(searchData) {
    var query = searchData['blog_query'];

    window.location.href = '/blogs/search?value=' + query
    // this.router.navigate([''], { queryParams: { value: query } });
  }

  onTagClick(event) {
    console.log(event);
  }

}
