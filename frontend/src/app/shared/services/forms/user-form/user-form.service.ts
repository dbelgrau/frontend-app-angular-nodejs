import { Injectable } from '@angular/core';
import { UserForm } from '../../../models/forms/user-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  public userForm: FormGroup<UserForm> = new FormGroup<UserForm>({
    name: new FormControl<string>("", [Validators.required,
      Validators.maxLength(20)]),
    age: new FormControl<number>(18, [Validators.required,
      Validators.min(1), Validators.max(120)]),
  });
}
