import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';

import { EvaluationCreate } from 'src/app/models/EvaluationCreate';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss'],
})
export class SubmitPageComponent implements OnInit {
  private problemId: string;
  public submission: EvaluationCreate;

  constructor(
    private submissionService: SubmissionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.submission = new EvaluationCreate(this.problemId);
  }

  public submit(): void {
    this.submissionService.create(this.submission).subscribe(
      (submission) => {
        console.log(submission);
        this.submission = new EvaluationCreate(this.problemId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
