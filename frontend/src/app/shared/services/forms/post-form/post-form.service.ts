import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostForm, PostTagForm } from 'src/app/shared/models/forms/post-form.model';

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  public postForm: FormGroup<PostForm> = new FormGroup<PostForm>({

    title: new FormControl<string>("",
      [Validators.required, Validators.maxLength(50)]),

    tags: new FormArray<FormGroup<PostTagForm>>([]),

    content: new FormControl<string>("", 
      [Validators.required, Validators.maxLength(1000)]),

  });

  public addTag(): FormGroup<PostTagForm> {
    const newTagForm: FormGroup<PostTagForm> = new FormGroup<PostTagForm>({
      tag: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    });
    this.postForm.controls.tags.push(newTagForm);
    
    return newTagForm;
  }

  public removeTag(i: number): void {
    this.postForm.controls.tags.removeAt(i);
  }
}
