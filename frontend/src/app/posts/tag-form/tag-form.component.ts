import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostTagForm } from 'src/app/shared/models/forms/post-form.model';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent {
  @Input() public tagForm!: FormGroup<PostTagForm>;
}
