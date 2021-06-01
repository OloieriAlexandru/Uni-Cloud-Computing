import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submissions-table-header',
  templateUrl: './submissions-table-header.component.html',
  styleUrls: ['./submissions-table-header.component.scss'],
})
export class SubmissionsTableHeaderComponent {
  @Input() public headerStr: string = 'Submissions';
  @Input() public darkMode: boolean = false;

  constructor() {}
}
