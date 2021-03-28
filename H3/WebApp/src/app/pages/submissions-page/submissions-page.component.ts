import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';

import { EvaluationGetAll } from 'src/app/models/EvaluationGetAll';

@Component({
  selector: 'app-submissions-page',
  templateUrl: './submissions-page.component.html',
  styleUrls: ['./submissions-page.component.scss'],
})
export class SubmissionsPageComponent implements OnInit {
  public submissions: EvaluationGetAll[] = null;

  constructor(
    private submissionService: SubmissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submissionService.getAll().subscribe(
      (submissions: EvaluationGetAll[]) => {
        this.submissions = submissions;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public enterSubmissionDetailsPage(submissionId) {
    this.router.navigate(['submission', submissionId]);
  }
}
