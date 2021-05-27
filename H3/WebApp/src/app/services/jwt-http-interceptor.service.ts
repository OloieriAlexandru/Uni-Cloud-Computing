import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
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
    let headers = this.accept(this.extractHeaders(request.headers));

    if (token) headers = this.bearerToken(headers, token);

    if (request.url.indexOf('upload') == -1)
      headers = this.contentType(headers);
    return next.handle(request.clone({ setHeaders: headers }));
  }


  public extractHeaders(requestHeaders) {
    let headers = {};
    requestHeaders.keys().forEach((key) => {
      headers[key] = requestHeaders[key];
    });
  }
  public accept(headers: any): any {
    return Object.assign({ Accept: 'application/json' }, headers);
  }
  public contentType(headers: any): any {
    return Object.assign({ 'Content-Type': 'application/json' }, headers);
  }
  public bearerToken(headers: any, token: string): any {
    return Object.assign({ Authorization: 'Bearer ' + token }, headers);
  }
}
