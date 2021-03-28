import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';

import { EvaluationGetById } from 'src/app/models/EvaluationGetById';

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.scss'],
})
export class SubmissionPageComponent implements OnInit {
  public submission: EvaluationGetById = null;

  constructor(
    private submissionService: SubmissionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let evaluationId = this.route.snapshot.paramMap.get('id');
    this.submissionService.getById(evaluationId).subscribe(
      (submission: EvaluationGetById) => {
        this.submission = submission;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}