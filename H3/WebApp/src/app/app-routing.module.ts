import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProblemDetailsPageComponent } from './pages/problem-details-page/problem-details-page.component';
import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { ProblemsUploadPageComponent } from './pages/problems-upload-page/problems-upload-page.component';
import { SubmissionPageComponent } from './pages/submission-page/submission-page.component';
import { SubmissionsPageComponent } from './pages/submissions-page/submissions-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthNotGuardService } from './services/auth-not-guard.service';

const routes: Routes = [
  {
    path: 'problems',
    component: ProblemsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'upload',
    component: ProblemsUploadPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'problems/:id',
    component: ProblemDetailsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'problems/:id/submit',
    component: SubmitPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'submissions',
    component: SubmissionsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'submission/:id',
    component: SubmissionPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthNotGuardService],
  },
  {
    path: '',
    redirectTo: '/problems',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/problems',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
