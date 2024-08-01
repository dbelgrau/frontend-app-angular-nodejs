import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from 'src/app/shared/models/data/login-data.model';
import { User } from 'src/app/shared/models/data/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public constructor(
    private httpClient: HttpClient
  ) { }

  public login(data: LoginData): Observable<{token: string, user: User}> {
    return this.httpClient.post<{token: string, user: User}>(`/api/auth/login`, data);
  }

  public register(data: LoginData): Observable<string> {
    return this.httpClient.post<string>(`/api/auth/register`, data);
  }
}
