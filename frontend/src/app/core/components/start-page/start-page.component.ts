import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/data/user.model';
import { CurrentUserService } from 'src/app/shared/services/data/current-user/current-user.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy {
  private sub: Subscription | null = null;

  public constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  public ngOnInit(): void {
    this.currentUserService.user.subscribe((u: User | null) => {
      if (u !== null) this.router.navigate(['posts']);
    });
  }

  protected goToLogin(): void {
    this.router.navigate(['users', 'login']);
  }

  protected goToPosts(): void {
    this.router.navigate(['posts']);
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
