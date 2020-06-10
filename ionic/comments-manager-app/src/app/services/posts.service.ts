import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }


  getAllPosts() {
    let url = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get(url);
  }

  getPost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.get(url);
  }

  getPostComments(id) {
    let url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    return this.http.get(url);
  }
}
