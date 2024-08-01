import { Injectable } from '@angular/core';
import { Post } from '../../../models/data/post.model';
import { PostHttpService } from 'src/app/features/services/post/post-http.service';
import { PostDto } from 'src/app/features/dto/post-dto.model';
import { UserService } from '../user/user.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from 'src/app/shared/models/data/user.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postList: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  public constructor(
    private postHttpService: PostHttpService,
    private userService: UserService
  ) { }

  public get posts(): Observable<Post[]> {
    return this.postList.asObservable();
  }

  public init(): void {
    this.postHttpService.getAll().subscribe((postDtos: PostDto[]) => {
      this.postList.next(this.mapPostDtosToPosts(postDtos));
    });
  }

  public findPost(id: string): Observable<Post | null> {
    return this.posts.pipe(
      map((posts: Post[]) => posts.find((p: Post) => p.id === id) || null)
    );
  }

  public findPostDto(id: string): Observable<PostDto | null> {
    return this.posts.pipe(
      map((posts: Post[]) => {
        const post: Post | undefined = posts.find((p: Post) => p.id === id);
        if (post) {
          return {
            id: post.id,
            author: post.author.id,
            title: post.title,
            tags: post.tags,
            date: post.date,
            content: post.content,
            verified: post.verified
          };
        }
        
        return null;
      })
    );
  }

  public addPost(post: PostDto): Observable<string | null> {
    return this.postHttpService.create(post).pipe(
      map(() => null),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }
  
  public updatePost(post: PostDto): Observable<string | null> {
    return this.postHttpService.update(post).pipe(
      map(() => null),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }
  
  public deletePost(id: string): Observable<string | null> {
    return this.postHttpService.delete(id).pipe(
      map(() => null),
      catchError((error: any) => {
        const errorMessage: string = this.getErrorMessage(error.status);
        
        return of(errorMessage);
      }),
      tap(() => this.init())
    );
  }

  private mapPostDtosToPosts(postDtos: PostDto[]): Post[] {
    return postDtos.map((postDto: PostDto) => {
      let author: User | null;
      this.userService.findUser(postDto.author)
        .subscribe((u: User | null) => author = u);
      
      return {
        ...postDto,
        author: author!
      };
    });
  }

  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
    case 401:
      return 'Niepoprawny lub nieaktualny token, zaloguj się ponownie';
    case 403:
      return 'Nie masz dostępu do tego zasobu.';
    case 404:
      return 'Nie znaleziono postu.';
    default:
      return 'Błąd serwera.';
    }
  }
}

