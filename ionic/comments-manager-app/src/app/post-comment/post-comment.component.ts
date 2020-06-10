import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {

  @Input() postID = 1;
  comments = [];
  allComments = [];
  constructor(
    private postService: PostsService
  ) {
    if (this.postID) {
      this.getPostComment();
    } else {
      console.log('not found')
    }
  }

  ngOnInit() { }

  getPostComment() {
    this.postService.getPostComments(this.postID).subscribe((data: any) => {
      this.comments = data;
      this.allComments = data;
      console.log(data);
    })
  }

  filterComment(e) {
    let query = e.target.value;
    if (query) {
      this.comments = this.allComments.filter((c) => {
        return c.name.includes(query) ||
          c.email.includes(query) ||
          c.body.includes(query)
      })
    } else {
      this.comments = this.allComments;
    }
  }
}
