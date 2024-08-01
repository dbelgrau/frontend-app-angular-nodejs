import { Injectable } from '@angular/core';
import { RegisterForm } from '../../../models/forms/register-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  public registerForm: FormGroup<RegisterForm> = new FormGroup<RegisterForm>({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required]),
    repeatPassword: new FormControl<string>("", [Validators.required]),
  }, { validators: confirmPasswordValidator });
}
