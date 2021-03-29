import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';

import { EvaluationCreate } from 'src/app/models/EvaluationCreate';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss'],
})
export class SubmitPageComponent implements OnInit {
  public problemId: string;
  public submission: EvaluationCreate;

  constructor(
    private submissionService: SubmissionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.submission = new EvaluationCreate(this.problemId);
  }

  public submit(): void {
    this.submissionService.create(this.submission).subscribe(
      (evaluationIdObject) => {
        this.router.navigate([
          'submission',
          evaluationIdObject['evaluationId'],
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
