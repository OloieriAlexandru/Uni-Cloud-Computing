import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(route, state: RouterStateSnapshot) {
    if (await this.authService.isLoggedIn()) {
      if (
        route.data.roles !== undefined &&
        !this.authService.hasRole(route.data.roles)
      ) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
