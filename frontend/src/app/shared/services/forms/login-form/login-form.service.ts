import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../../models/forms/login-form.model';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required]),
  });
}
