import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EvaluationGetAll } from 'src/app/models/EvaluationGetAll';

@Component({
  selector: 'app-submission-card',
  templateUrl: './submission-card.component.html',
  styleUrls: ['./submission-card.component.scss'],
})
export class SubmissionCardComponent {
  @Input() public submission: EvaluationGetAll = null;
  @Output() public submissionSelected: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public onSubmissionSelected() {
    this.submissionSelected.emit(this.submission.id);
  }
}
