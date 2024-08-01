import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface PostForm {
  readonly title: FormControl<string | null>,
  readonly tags: FormArray<FormGroup<PostTagForm>>,
  readonly content: FormControl<string | null>
}

export interface PostTagForm {
  readonly tag: FormControl<string | null>
}