import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { GenericService } from './generic.service';

import { UserCredentials } from '../models/UserCredentials';
import { UserRoles } from '../models/UserRoles';

import { environment } from 'src/environments/environment';
import { JwtRefreshTokenInfo } from '../models/JwtRefreshTokenInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private URL = environment.authURL;
  private userRole: UserRoles | null = null;
  private userRoleSubject: BehaviorSubject<UserRoles | null> =
    new BehaviorSubject(null);

  constructor(
    private baseService: GenericService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token !== undefined) {
      this.setRole(token).subscribe();
    }
  }

  public login(credentials: UserCredentials) {
    return this.baseService.post(this.URL, '/login', credentials).pipe(
      map(async (response: any): Promise<any> => {
        if (response && response.accessToken && response.refreshToken) {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          await this.setRole(response.accessToken).toPromise();
          return { status: true };
        }
      }),
      catchError((err: any): any => {
        throw new Error(err.error.message);
      })
    );
  }

  public getRoleObservable(): Observable<UserRoles | null> {
    return this.userRoleSubject.asObservable();
  }

  private setRole(token: string) {
    return this.baseService.post(this.URL, '/roles', { token }).pipe(
      map((response: any): any => {
        if (response && response.role) {
          this.userRole = response.role;
          this.userRoleSubject.next(this.userRole);
        } else {
          this.logout();
        }
      }),
      catchError((err: any): any => {
        throw new Error(err.error.message);
      })
    );
  }

  public getRefreshTokenInfo(): JwtRefreshTokenInfo {
    const token: string = localStorage.getItem('refresh_token');

    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken<JwtRefreshTokenInfo>(token);
  }

  public logout() {
    this.baseService.delete(this.URL, '/logout', {
      token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['auth']);
    this.userRole = null;
    this.userRoleSubject.next(this.userRole);
  }

  public async isLoggedIn(): Promise<boolean> {
    const token: string = this.jwtHelper.tokenGetter();

    if (!token && !localStorage.getItem('refresh_token')) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired()) {
      localStorage.removeItem('access_token');
      await this.setNewAccessToken().toPromise();
      return false;
    }

    return true;
  }

  public async hasRole(roles: UserRoles[]) {
    if (this.userRole == null) {
      await this.setRole(localStorage.getItem('access_token')).toPromise();
    }
    return roles.indexOf(this.userRole) !== -1;
  }

  public setNewAccessToken() {
    return this.baseService
      .post(this.URL, '/token', {
        token: localStorage.getItem('refresh_token'),
      })
      .pipe(
        map(async (response: any): Promise<any> => {
          if (response && response.accessToken) {
            localStorage.setItem('access_token', response.accessToken);
            await this.setRole(response.accessToken).toPromise();
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
