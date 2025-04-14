import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && req.url.includes('/login')) {
          const token = event.body?.token;
          const userId = event.body?.userId;
          if (userId) {
            localStorage.removeItem('userId');
            localStorage.setItem('userId', userId);
          }
          if (token) {
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
          }
        }
      })
    );
  }
}