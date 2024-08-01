import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { isLogged } from "../shared/guards/logged.guard";

const routes: Routes = [
  {
    path: 'login',
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: 'register',  
    component: RegistrationComponent
  },
  {
    path: ':id',
    component: UserFormComponent,
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

export class UserRoutingModule {}