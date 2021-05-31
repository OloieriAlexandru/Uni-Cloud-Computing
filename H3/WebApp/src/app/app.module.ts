import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import * as M from 'materialize-css/dist/js/materialize';
import { GenericService } from './services/generic.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProblemsService } from './services/problems.service';
import { SubmissionsService } from './services/submissions.service';
import { AuthNotGuardService } from './services/auth-not-guard.service';
import { JwtHttpInterceptorService } from './services/jwt-http-interceptor.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';
import { SubmissionsPageComponent } from './pages/submissions-page/submissions-page.component';
import { SubmissionPageComponent } from './pages/submission-page/submission-page.component';
import { ProblemCardComponent } from './components/problem-card/problem-card.component';
import { SubmissionCardComponent } from './components/submission-card/submission-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemDetailsPageComponent } from './pages/problem-details-page/problem-details-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProblemsUploadPageComponent } from './pages/problems-upload-page/problems-upload-page.component';
import { from } from 'rxjs';
import { PendingProblemsPageComponent } from './pages/pending-problems-page/pending-problems-page.component';
import { PendingProblemDetailsPageComponent } from './pages/pending-problem-details-page/pending-problem-details-page.component';
import { SolutionPageComponent } from './pages/solution-page/solution-page.component';
import { IndicationsPageComponent } from './pages/indications-page/indications-page.component';
import { PremiumPageComponent } from './pages/premium-page/premium-page.component';

export function tokenFunc() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ProblemsPageComponent,
    SubmitPageComponent,
    SubmissionsPageComponent,
    SubmissionPageComponent,
    ProblemCardComponent,
    SubmissionCardComponent,
    NavbarComponent,
    ProblemDetailsPageComponent,
    AuthComponent,
    ProblemsUploadPageComponent,
    PendingProblemsPageComponent,
    PendingProblemDetailsPageComponent,
    SolutionPageComponent,
    IndicationsPageComponent,
    PremiumPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenFunc,
        allowedDomains: ['localhost'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtHttpInterceptorService,
      multi: true,
    },
    GenericService,
    { provide: 'M', useValue: M },
    AuthGuardService,
    ProblemsService,
    SubmissionsService,
    AuthNotGuardService,
    JwtHttpInterceptorService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
