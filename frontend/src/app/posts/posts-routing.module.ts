import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostComponent } from "./post/post.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { isLogged } from "../shared/guards/logged.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: PostsListComponent
  },
  {
    path: 'details/:id',  
    component: PostComponent
  },
  {
    path: 'form',
    component: PostFormComponent,
    canActivate: [isLogged]
  },
  {
    path: 'form/:id',
    component: PostFormComponent,
    canActivate: [isLogged]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule
  ],
  exports: [
    RouterModule
  ]
})

export class PostsRoutingModule {}