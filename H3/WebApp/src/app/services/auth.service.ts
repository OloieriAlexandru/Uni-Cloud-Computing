import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

import { GenericService } from './generic.service';

import { UserCredentials } from '../models/UserCredentials';

import { environment } from 'src/environments/environment';
import { UserRoles } from '../models/UserRoles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.authURL;
  private userRole: UserRoles | null;

  constructor(
    private baseService: GenericService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  public login(credentials: UserCredentials) {
    return this.baseService.post(this.URL, 'login', credentials).pipe(
      map(async (response: any): Promise<any> => {
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

  private setRole(token) {
    return this.baseService.post(this.URL, 'roles', { token: token }).pipe(
      map((response: any): any => {
        if (response && response.role) {
          this.userRole = response.role;
        } else {
          this.logout();
        }
      }),
      catchError((err: any): any => {
        throw new Error(err.error.message);
      })
    );
  }

  public logout() {
    this.baseService.delete(this.URL, 'logout', {
      token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['auth']);
  }

  public async isLoggedIn(): Promise<boolean> {
    const token: string = this.jwtHelper.tokenGetter();

    if (!token && !localStorage.getItem('refresh_token')) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired()) {
      localStorage.removeItem('access_token');
      const result = await this.getNewAccessToken().toPromise();
      return false;
    }

    return true;
  }

  public async hasRole(roles: UserRoles[]) {
    await this.setRole(localStorage.getItem('access_token')).toPromise();
    return roles.indexOf(this.userRole) !== -1;
  }

  public getNewAccessToken() {
    return this.baseService
      .post(this.URL, 'token', { token: localStorage.getItem('refresh_token') })
      .pipe(
        map((response: any): any => {
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
