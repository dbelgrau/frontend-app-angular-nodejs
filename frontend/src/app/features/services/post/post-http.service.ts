import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto } from '../../dto/post-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostHttpService {

  public constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(`/api/posts`);
  }

  public getById(id: string): Observable<PostDto> {
    return this.httpClient.get<PostDto>(`/api/posts/${id}`);
  }

  public create(post: PostDto): Observable<PostDto> {
    return this.httpClient.post<PostDto>(`/api/posts`, post);
  }

  public update(post: PostDto): Observable<PostDto> {
    return this.httpClient.put<PostDto>(`/api/posts/${post.id}`, post);
  }

  public delete(id: string): Observable<string> {
    return this.httpClient.delete(`/api/posts/${id}`, { responseType: 'text' });
  }
}
