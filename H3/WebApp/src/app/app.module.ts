import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import  {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as M from 'materialize-css/dist/js/materialize';
import { GenericService } from './services/generic.service';

import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';
import { SubmissionsPageComponent } from './pages/submissions-page/submissions-page.component';
import { SubmissionPageComponent } from './pages/submission-page/submission-page.component';
import { ProblemCardComponent } from './components/problem-card/problem-card.component';
import { SubmissionCardComponent } from './components/submission-card/submission-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemDetailsPageComponent } from './pages/problem-details-page/problem-details-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ProblemsUploadPageComponent } from './pages/problems-upload-page/problems-upload-page.component';
import { from } from 'rxjs';
import { PendingProblemsPageComponent } from './pages/pending-problems-page/pending-problems-page.component';
import { PendingProblemDetailsPageComponent } from './pages/pending-problem-details-page/pending-problem-details-page.component';



export function tokenFunc() {
  return localStorage.getItem("access_token");
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenFunc,
          allowedDomains: ["localhost"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [GenericService, { provide: 'M', useValue: M }],
  bootstrap: [AppComponent],
})
export class AppModule { }
