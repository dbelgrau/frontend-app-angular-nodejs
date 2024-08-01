import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/data/post.model';
import { CurrentUserService } from 'src/app/shared/services/data/current-user/current-user.service';
import { PostService } from 'src/app/shared/services/data/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  protected post: Post | null = null;
  protected canModify: boolean = false;
  protected errorMessage: string | null = null;
  protected confirmDelete: boolean = false;
  private sub: Subscription | null = null;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private router: Router,
    private postService: PostService
  ){}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const postId: string = params['id'];
      this.sub = this.postService.findPost(postId)
        .subscribe((p: Post | null) => this.post = p);

      if (this.post) {
        this.canModify = this.post.author.id === this.currentUserService.userId || this.currentUserService.isAdmin;
      }
    });
  }

  protected goToPosts(): void {
    this.router.navigate(['posts']);
  }

  protected goToForm(): void {
    if (this.post) this.router.navigate(['posts', 'form', this.post.id]);
  }

  protected deletePost(): void {
    this.postService.deletePost(this.post!.id).subscribe((m: string | null) => {
      this.errorMessage = m;
      if (m) this.router.navigate(['posts']);
    });
  }

  protected setConfirmDelete(val: boolean): void {
    this.confirmDelete = val;
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
