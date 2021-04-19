import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { UserNew } from 'src/app/models/UserNew';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public newUser: UserNew = new UserNew();
  public userCredentials: UserCredentials = new UserCredentials();

  constructor(
    @Inject('M') private M: any,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public register() {
    this.userService.createUser(this.newUser).subscribe(
      (res) => {
        this.newUser = new UserNew();
        this.M.toast({
          html: 'User created successfully!',
          classes: 'green darken-3',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public signIn() {
    this.authService.login(this.userCredentials).subscribe((res) => {
      this.M.toast({
        html: 'Logging in!',
        classes: 'green darken-3',
        displayLength: 2000,
      });
      setTimeout(() => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/app']);
      }, 2000);
    });
  }
}
