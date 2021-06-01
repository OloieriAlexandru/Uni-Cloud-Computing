import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationGetAll } from 'src/app/models/EvaluationGetAll';

@Component({
  selector: 'app-submission-card',
  templateUrl: './submission-card.component.html',
  styleUrls: ['./submission-card.component.scss'],
})
export class SubmissionCardComponent {
  @Input() public submission: EvaluationGetAll = null;
  @Input() public darkMode: boolean = false;
  @Output() public submissionSelected: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  public onSubmissionSelected() {
    this.submissionSelected.emit(this.submission.id);
  }

  public onProblemClicked() {
    this.router.navigate(['problems', this.submission.problemId]);
  }

  public onUserClicked() {
    this.router.navigate(['profile', this.submission.userEmail]);
  }
}
