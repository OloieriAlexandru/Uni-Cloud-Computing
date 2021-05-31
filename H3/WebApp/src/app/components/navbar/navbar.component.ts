import { Component } from '@angular/core';
import { UserRoles } from 'src/app/models/UserRoles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent{
  private role;
  private roleObservable;
  constructor(private authService: AuthService) {
    this.roleObservable = this.authService
      .getRoleObservable()
      .subscribe((newRole) => {
        this.role = newRole;
      });
  }
  public logout() {
    this.authService.logout();
  }
  public canViewSubmissions() {
    return [UserRoles.MODERATOR, UserRoles.ADMIN].indexOf(this.role) !== -1;
  }
}
