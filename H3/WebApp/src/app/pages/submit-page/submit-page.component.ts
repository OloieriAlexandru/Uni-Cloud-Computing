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
  public problemId: string;
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
    let submissionToSend: EvaluationCreate = {
      problemId: this.submission.problemId,
      programmingLanguage: this.submission.programmingLanguage,
      sourceCode: this.escapeCharacters(this.submission.sourceCode),
    };
    this.submissionService.create(submissionToSend).subscribe(
      (submission) => {
        console.log(submission);
        this.submission = new EvaluationCreate(this.problemId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private escapeCharacters(s: string): string {
    s = s.replace(/\n/, '\\n');
    s = s.replace(/\t/, '\\t');
    s = s.replace(/\r/, '\\r');
    return s;
  }
}
