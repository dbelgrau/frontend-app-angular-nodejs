import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/services/login/login.service';
import { LoginData } from 'src/app/shared/models/data/login-data.model';
import { LoginForm } from 'src/app/shared/models/forms/login-form.model';
import { CurrentUserService } from 'src/app/shared/services/data/current-user/current-user.service';
import { LoginFormService } from 'src/app/shared/services/forms/login-form/login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected loginForm: FormGroup<LoginForm> = this.loginFormService.loginForm;
  protected loginData: LoginData = {
    email: "",
    password: "",
  };
  protected errorMessage: string | null = null;

  public constructor(
    private loginFormService: LoginFormService,
    private loginService: LoginService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  protected goToRegister(): void {
    this.router.navigate(['users','register']);
  }

  protected login(): void {
    this.loginService.login(this.loginForm.value as LoginData)
      .subscribe(
        ({token, user}: any) => {
          this.currentUserService.setCurrentUser(user, token);
          this.errorMessage = null;
          this.router.navigate(['posts']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = "Niepoprawny email lub hasło";
          }
          else if (error.status === 500) {
            this.errorMessage = "Błąd serwera - spróbuj ponownie później";
          }
        }
      );
  }
}
