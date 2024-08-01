import { Injectable } from '@angular/core';
import { User } from '../../../models/data/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private currentToken: string = "";

  public get user(): Observable<User | null> {
    return this.currentUser;
  }

  public get userId(): string {
    return (this.currentUser.getValue())? this.currentUser.getValue()!.id : "";
  }

  public get token(): string {
    return this.currentToken;
  }

  public get isAdmin(): boolean {
    return this.currentUser.getValue()?.role === 'ADMIN';
  }

  public loadCurrentUser(): void {
    this.currentUser.next(JSON.parse(localStorage.getItem('user')!) || null);
    this.currentToken = localStorage.getItem('token')! || "";
  }

  public setCurrentUser(user: User | null, token: string): void {
    this.currentUser.next(user);
    this.currentToken = token;
    this.updateLocalStorage();
  }

  public renameCurrentUser(name: string): void {
    const renamedUser: User | null = this.currentUser.getValue();
    if (renamedUser) {
      renamedUser.name = name;
      this.currentUser.next(renamedUser);
    }
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('token', this.currentToken);
    localStorage.setItem('user', JSON.stringify(this.currentUser.getValue()));
  }

}
