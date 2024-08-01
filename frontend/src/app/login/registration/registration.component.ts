import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/services/login/login.service';
import { LoginData } from 'src/app/shared/models/data/login-data.model';
import { RegisterForm } from 'src/app/shared/models/forms/register-form.model';
import { UserService } from 'src/app/shared/services/data/user/user.service';
import { RegisterFormService } from 'src/app/shared/services/forms/register-form/register-form.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  protected registerForm: FormGroup<RegisterForm> = this.registerFormService.registerForm;
  protected registerData: LoginData = {
    email: "",
    password: "",
  };
  protected errorMessage: string | null = null;

  public constructor(
    private registerFormService: RegisterFormService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ){}

  protected register(): void {
    this.loginService.register(this.registerForm.value as LoginData)
      .subscribe(() => {
        this.errorMessage = null;
        this.userService.init();
        this.router.navigate(['users', 'login']);
      },(error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.errorMessage = "Ten email jest już zajęty";
        }
        else if (error.status === 500) {
          this.errorMessage = "Błąd serwera - spróbuj ponownie później";
        }
      }
      );
  }

  protected goToStart(): void {
    this.router.navigate(['']);
  }
}
