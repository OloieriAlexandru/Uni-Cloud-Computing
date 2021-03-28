import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProblemGetAll } from 'src/app/models/ProblemGetAll';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.scss'],
})
export class ProblemCardComponent {
  @Input() public problem: ProblemGetAll = null;
  @Output() public problemSelected: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public onProblemSelected() {
    this.problemSelected.emit(this.problem.id);
  }
}
