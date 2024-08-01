import { Injectable } from '@angular/core';
import { User } from '../../../models/data/user.model';
import { UserHttpService } from 'src/app/features/services/user/user-http.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  public constructor(
    private userHttpService: UserHttpService,
    private currentUserService: CurrentUserService
  ) { }

  public get users(): Observable<User[]> {
    return this.userList.asObservable();
  }

  public init(): void {
    this.userHttpService.getAll().subscribe((users: User[]) => {
      this.userList.next(users);
    });
  }

  public findUser(id: string): Observable<User | null> {
    return this.users.pipe(
      map((users: User[]) => users.find((u: User | null) => u!.id === id) || null)
    );
  }

  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
    case 401:
      return 'Niepoprawny lub nieaktualny token, zaloguj się ponownie';
    case 403:
      return 'Nie masz dostępu do tego zasobu.';
    case 404:
      return 'Nie znaleziono użytkownika.';
    default:
      return 'Błąd serwera.';
    }
  }
  
  public addUser(user: User): Observable<string | null> {
    return this.userHttpService.create(user).pipe(
      map(() => null),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }
  
  public updateUser(user: User): Observable<string | null> {
    return this.userHttpService.update(user).pipe(
      map((updatedUser: User) => {
        this.currentUserService.renameCurrentUser(updatedUser.name);
        
        return null;
      }),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }
  
  public deleteUser(id: string): Observable<string | null> {
    return this.userHttpService.delete(id).pipe(
      map(() => null),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }
}

