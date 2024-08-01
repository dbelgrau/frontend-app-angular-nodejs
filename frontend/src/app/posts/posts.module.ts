import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagFormComponent } from './tag-form/tag-form.component';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    PostComponent,
    TagFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    TranslateModule
  ]
})
export class PostsModule { }
