import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { UserRoles } from 'src/app/models/UserRoles';
import { JwtRefreshTokenInfo } from 'src/app/models/JwtRefreshTokenInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private role;

  public tokenInfo: JwtRefreshTokenInfo = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.initRole();
    this.authService.getRoleObservable().subscribe((newRole) => {
      this.role = newRole;
      this.tokenInfo = this.authService.getRefreshTokenInfo();
    });
    this.tokenInfo = this.authService.getRefreshTokenInfo();
  }

  public logout() {
    this.authService.logout();
  }

  public canViewSubmissions() {
    return [UserRoles.MODERATOR, UserRoles.ADMIN].indexOf(this.role) !== -1;
  }
  public canGetPremium() {
    return this.role==UserRoles.BASIC;
  }

  public viewUserProfile() {
    this.router.navigate(['profile', this.tokenInfo.email]);
  }
}
