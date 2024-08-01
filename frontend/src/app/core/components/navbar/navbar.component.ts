import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/features/services/translation/translation.service';
import { User } from 'src/app/shared/models/data/user.model';
import { CurrentUserService } from 'src/app/shared/services/data/current-user/current-user.service';
import { PostService } from 'src/app/shared/services/data/post/post.service';
import { UserService } from 'src/app/shared/services/data/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected user: User | null = null;
  protected isTranslate: boolean = false;
  private sub: Subscription | null = null;

  public constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private translationService: TranslationService,
    protected translate: TranslateService
  ){}

  protected isUser(): boolean {
    return this.user !== null;
  }

  public ngOnInit(): void {
    this.userService.init();
    this.postService.init();
    this.sub = this.currentUserService.user.subscribe((u: User | null) => this.user = u);
    this.currentUserService.loadCurrentUser();
  }

  protected goToLogin(): void {
    this.router.navigate(['users', 'login']);
  }

  protected goToUser(): void {
    if (this.user) {
      this.router.navigate(['users', this.user.id]);
    }
  }

  protected logoutUser(): void {
    this.currentUserService.setCurrentUser(null, "");
    this.router.navigate(['']);
  }

  protected setTranslate(val: boolean): void {
    this.isTranslate = val;
    if (val) this.translationService.setLanguage('en');
    else this.translationService.setLanguage('pl');
  }

  public ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
}
