import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@Angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GenericService } from './services/generic.service';

import { ProblemsPageComponent } from './pages/problems-page/problems-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';
import { SubmissionsPageComponent } from './pages/submissions-page/submissions-page.component';
import { SubmissionPageComponent } from './pages/submission-page/submission-page.component';
import { ProblemCardComponent } from './components/problem-card/problem-card.component';
import { SubmissionCardComponent } from './components/submission-card/submission-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [GenericService],
  bootstrap: [AppComponent],
})
export class AppModule {}
