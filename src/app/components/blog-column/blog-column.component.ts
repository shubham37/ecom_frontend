import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'blog-column',
  templateUrl: './blog-column.component.html',
  styleUrls: ['./blog-column.component.css']
})
export class BlogColumnComponent implements OnInit {
  blog: {};
  formGroup: FormGroup;
  is_processing= false;
  snackbar: any;


  constructor(private formBuilder: FormBuilder, private blogApi: BlogService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      email: new FormControl('',[
        Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
      ]),
      comment: new FormControl('', [Validators.required])
    });
    this.getData();
  }

  getData(): void {
    this.blogApi.GetBlog(this.route.snapshot.params.blogid).subscribe(
      data => {
        this.blog = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  
  onSubmit(reviewData) {
    this.is_processing = true;
    this.snackbar = document.getElementById("snackbar");
    if (this.formGroup.invalid) {
      return;
    }

    this.blogApi.addBlogReview(this.route.snapshot.params.blogid, reviewData).subscribe(
      data => {
        this.formGroup.reset();
        this.getData();
        this.snackbar.innerText = "You Reviewed successfully."
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);

      },
      error => {
        this.snackbar.innerText = error
        this.snackbar.className = "show";
        setTimeout(function(){ this.snackbar.className = this.snackbar.className.replace("show", ""); }, 3000);
      }
    )
    this.is_processing = false;
  }

}
