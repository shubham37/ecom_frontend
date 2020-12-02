import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string;
  constructor(private httpClient: HttpClient, private config: ConfigService) { 
    this.url = this.config.get('baseUrl') + '/blog_api';
  }

  // Call on Blog Component Load
  GetBlogs() : Observable<any> {
    return this.httpClient.get(this.url + '/blogs')
  }

  // Call on particular Blog Clicked
  GetBlog(blog_id) : Observable<any> {
    return this.httpClient.get(this.url+'/blogs/'+blog_id)
  }

  // Call On Blog Tag or search byt topic form submit
  GetBlogsBySearchAndTag(topic) : Observable<any> {
    return this.httpClient.post<any>(this.url + '/blogs/search/', {
      'text': topic
    });
  }

  // Call Default Latest
  GetLatestBlog() : Observable<any> {
    return this.httpClient.get(this.url + '/blogs/latest')
  }

  // Call on Submit Review againt Blog
  addBlogReview(blog_id, reviewData) : Observable<any> {
    return this.httpClient.post<any>(this.url+ '/blogs_comment/', {
      'blog_id': blog_id,
      'blog_comment_data': reviewData
    })
  }

}
