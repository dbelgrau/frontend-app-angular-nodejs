import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from 'src/app/shared/models/data/user.model';
import { UserForm } from 'src/app/shared/models/forms/user-form.model';
import { UserFormService } from 'src/app/shared/services/forms/user-form/user-form.service';
import { UserService } from 'src/app/shared/services/data/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  protected userForm: FormGroup<UserForm> = this.userFormService.userForm;
  protected userId: string = "";
  protected user: User = {id: "", name: "", age: 18, role: UserRole.USER};
  protected confirmSave: boolean = false;
  protected errorMessage: string | null = null;
  private sub: Subscription | null = null;

  public constructor(
    private userFormService: UserFormService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['id']; 
    });
    this.sub = this.userService.users.subscribe((users: User[]) => {
      const found: User | undefined = users.find((u: User) => u.id === this.userId);
      if (found) {
        this.user = found;
        this.userForm.patchValue({
          name: this.user.name,
          age: this.user.age
        });
      }
    });
  }

  protected save(): void {
    this.user.name = this.userForm.value.name || "";
    this.user.age = this.userForm.value.age || 18;
    this.userService.updateUser(this.user)
      .subscribe((m: string | null) => this.errorMessage = m);
    this.setConfirmSave(false);
  }

  protected setConfirmSave(val: boolean): void{
    this.confirmSave = val;
  }

  protected goToStart(): void {
    this.router.navigate(['']);
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
