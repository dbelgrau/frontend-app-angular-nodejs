import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/data/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  public constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`/api/users`);
  }

  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`/api/users/${id}`);
  }

  public create(user: User): Observable<User> {
    return this.httpClient.post<User>(`/api/users`, user);
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(`/api/users/${user.id}`, user);
  }

  public delete(id: string): Observable<string> {
    return this.httpClient.delete(`/api/users/${id}`, { responseType: 'text' });
  }
}
