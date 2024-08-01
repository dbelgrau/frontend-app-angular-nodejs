import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './core/components/start-page/start-page.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StartPageComponent
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts-routing.module').then((m: any) => m.PostsRoutingModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./login/login-routing.module').then((m: any) => m.UserRoutingModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
