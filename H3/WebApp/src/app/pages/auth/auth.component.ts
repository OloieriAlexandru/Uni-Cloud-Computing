import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { UserNew } from 'src/app/models/UserNew';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snack-bar/snack-bar.component';

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
    private route: ActivatedRoute,
    private readonly superM: MatSnackBar,
  ) { }

  public register() {
    this.userService.createUser(this.newUser).subscribe(
      (res) => {
        this.newUser = new UserNew();
        this.superM.openFromComponent(SnackbarComponent,
          {
            duration: 5000, data:
              { error: false, message: 'Account successfully created!' },
            panelClass: 'style-success'
          }
        );
      },
      (err) => {
        if (err && err.error && err.error.errors) {
          console.log(err.error.errors);
          this.superM.openFromComponent(SnackbarComponent,
            {
              duration: 5000, data:
                { error: true, message: err.error.errors[0].msg },
              panelClass: 'style-error'
            }
          );
          return;
        }
        this.superM.openFromComponent(SnackbarComponent,
          {
            duration: 50000, data:
              { error: true, message: err.error ?? 'On no, something went wrong!' },
            panelClass: 'style-error'
          }
        );
      }
    );
  }

  public signIn() {
    this.authService.login(this.userCredentials).subscribe(
      (res) => {
        this.superM.openFromComponent(SnackbarComponent,
          {
            duration: 5000, data:
              { error: false, message: 'Logging in, get ready!' },
            panelClass: 'style-success'
          }
        );
        setTimeout(() => {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/app']);
        }, 2000);
      },
      (err) => {
        if (err && err.error && err.error.errors) {
          this.superM.openFromComponent(SnackbarComponent,
            {
              duration: 5000, data:
                { error: true, message: err.error.errors[0].msg },
              panelClass: 'style-error'
            }
          );
        } else {
          this.superM.openFromComponent(SnackbarComponent,
            {
              duration: 5000, data:
                { error: true, message: 'On no, something went wrong!' },
              panelClass: 'style-error'
            }
          );
        }
      }
    );
  }
}
