import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetAll } from 'src/app/models/ProblemGetAll';

@Component({
  selector: 'app-pending-problems-page',
  templateUrl: './pending-problems-page.component.html',
  styleUrls: ['./pending-problems-page.component.scss'],
})
export class PendingProblemsPageComponent implements OnInit {
  public problems: ProblemGetAll[] = null;

  constructor(
    private problemService: ProblemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.problemService.getAllPending().subscribe(
      (problems: ProblemGetAll[]) => {
        this.problems = problems;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public enterApprovingPage(problemId) {
    this.router.navigate(['pending', problemId]);
  }
}
