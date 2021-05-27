import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtHttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    let clone: HttpRequest<any>;

    if(request.url.indexOf("upload") > 0) {
      return next.handle(request);
    }

    if (token) {
      clone = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
    } else {
      clone = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(clone);
  }
}
