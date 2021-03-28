import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { SubmissionPageComponent } from './pages/submission-page/submission-page.component';
import { SubmissionsPageComponent } from './pages/submissions-page/submissions-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';

const routes: Routes = [
  {
    path: 'problems',
    component: ProblemsPageComponent,
  },
  {
    path: 'problems/:id/submit',
    component: SubmitPageComponent,
  },
  {
    path: 'submissions',
    component: SubmissionsPageComponent,
  },
  {
    path: 'submission/:id',
    component: SubmissionPageComponent,
  },
  {
    path: '',
    redirectTo: '/problems',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/problems',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
