import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';

import { GenericService } from './generic.service';

import { UserCredentials } from '../models/UserCredentials';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.authURL;

  constructor(
    private baseService: GenericService,
    private jwtHelper: JwtHelperService
  ) { }

  public login(credentials: UserCredentials) {
    return this.baseService.post(this.URL, 'login', credentials).pipe(
      map((response: any): any => {
        if (response && response.accessToken && response.refreshToken) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          return { status: true };
        }
      }),
      catchError((err: any): any => {
        throw new Error(err.error.message);
      })
    );
  }

  public logout() {
    this.baseService.delete(this.URL, 'logout', { token: localStorage.getItem("refresh_token") });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }

  public async isLoggedIn(): Promise<boolean> {
    const token: string = this.jwtHelper.tokenGetter();

    if (!token && !localStorage.getItem("refresh_token")) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired()) {
      localStorage.removeItem('access_token');
      const result = await this.getNewAccessToken().toPromise();
      console.log(result)
      return false;
    }

    return true;
  }

  public getNewAccessToken() {
    return this.baseService.post(this.URL, 'token', { token: localStorage.getItem("refresh_token") }).pipe(
      map((response: any): any => {
        console.log(response);
        if (response && response.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
          return { status: true };
        }
        return { status: false };
      }),
      catchError((err: any): any => {
        return { status: false };
      })
    );
  }
}
