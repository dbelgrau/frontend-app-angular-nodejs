import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostDto } from 'src/app/features/dto/post-dto.model';
import { PostService } from 'src/app/shared/services/data/post/post.service';
import { CurrentUserService } from 'src/app/shared/services/data/current-user/current-user.service';
import { PostFormService } from '../../shared/services/forms/post-form/post-form.service';
import { PostForm, PostTagForm } from 'src/app/shared/models/forms/post-form.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  protected postForm: FormGroup<PostForm> = this.postFormService.postForm;
  protected post: PostDto = {
    id: '',
    author: '',
    title: '',
    tags: [],
    date: '',
    content: '',
    verified: false
  };

  protected isEditMode: boolean = false;
  protected confirmSave: boolean = false;
  protected errorMessage: string | null = null;
  private sub: Subscription | null = null;

  public constructor(
    private postFormService: PostFormService,
    private userService: CurrentUserService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  protected get tags(): FormArray<FormGroup<PostTagForm>> {
    return this.postForm.controls.tags as FormArray<FormGroup<PostTagForm>>;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const postId: string = params['id'];
      if (postId) {
        this.loadPost(postId);
        this.isEditMode = true;
      } else {
        this.clearPost();
        this.post.author = this.userService.userId || "no-id";
      }
    });
  }

  protected addTag(): void {
    this.postFormService.addTag();
  }

  protected removeTag(i: number): void {
    this.postFormService.removeTag(i);
  }

  protected save(): void {
    this.post.title = this.postForm.value.title || "";
    this.post.content = this.postForm.value.content || "";
    this.post.tags = this.tags.value.map((t: any) => t.tag || "no-tag");
    if (this.isEditMode) {
      this.postService.updatePost(this.post)
        .subscribe((m: string | null) => this.handleSaveResponse(m, ['posts','details', this.post.id]));
    } else {
      this.post.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
      this.postService.addPost(this.post)
        .subscribe((m: string | null) => this.handleSaveResponse(m, ['posts']));
    }
    this.confirmSave = false;
  }

  private handleSaveResponse(message: string | null, route: string[]): void {
    this.errorMessage = message;
    if (!message) this.router.navigate(route);
  }

  private clearPost(): void {
    this.postForm.patchValue({
      title: '',
      content: ''
    });
    while (this.tags.length !== 0) {
      this.removeTag(0);
    }
  }

  private loadPost(postId: string): void {
    this.sub = this.postService.findPostDto(postId)
      .subscribe((p: PostDto | null) => { 
        if(p){
          this.post = p;
          this.postForm.patchValue({
            title: p.title,
            content: p.content
          });

          while (this.tags.length !== 0) {
            this.removeTag(0);
          }

          p.tags.forEach((tag: string) => {
            const tagForm: any = this.postFormService.addTag();
            tagForm.patchValue({
              tag: tag
            });
          });
        }
      });
  }

  protected setConfirmSave(val: boolean): void {
    this.confirmSave = val;
  }

  protected goToStart(): void {
    this.router.navigate(['']);
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
