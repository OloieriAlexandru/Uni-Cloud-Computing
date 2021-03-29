import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';

import { EvaluationGetById } from 'src/app/models/EvaluationGetById';
import { TestCaseInfo } from 'src/app/models/TestCaseInfo';

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.scss'],
})
export class SubmissionPageComponent implements OnInit {
  public submission: EvaluationGetById = null;
  public testCasesInfo: TestCaseInfo[] = null;
  public displayedColumns: string[] = ['No', 'Time', 'Message', 'Score'];

  constructor(
    private submissionService: SubmissionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let evaluationId = this.route.snapshot.paramMap.get('id');
    this.submissionService.getById(evaluationId).subscribe(
      (submission: EvaluationGetById) => {
        this.submission = submission;
        if (this.submission.testCasesInfo != null) {
          this.testCasesInfo = this.submission.testCasesInfo;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
