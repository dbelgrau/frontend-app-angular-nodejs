import { FormControl } from "@angular/forms";

export interface UserForm {
  readonly name: FormControl<string | null>,
  readonly age: FormControl<number | null>
}