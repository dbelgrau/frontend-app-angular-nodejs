import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostTagForm } from 'src/app/shared/models/forms/post-form.model';

@Injectable({
  providedIn: 'root'
})
export class TagFormService {
  public tagForm: FormGroup<PostTagForm> = new FormGroup<PostTagForm>({
    tag: new FormControl<string>("", [Validators.required]),
  });
}
