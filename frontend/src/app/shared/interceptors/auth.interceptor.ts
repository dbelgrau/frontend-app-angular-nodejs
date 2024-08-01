import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/data/current-user/current-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizedRequest: any = request.clone({
      setHeaders: {
        'Authorization': inject(CurrentUserService).token,
      },
    });

    return next.handle(authorizedRequest);
  }
}
