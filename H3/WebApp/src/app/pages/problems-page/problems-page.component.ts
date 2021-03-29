import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetAll } from 'src/app/models/ProblemGetAll';

@Component({
  selector: 'app-problems-page',
  templateUrl: './problems-page.component.html',
  styleUrls: ['./problems-page.component.scss'],
})
export class ProblemsPageComponent implements OnInit {
  public problems: ProblemGetAll[] = null;

  constructor(
    private problemService: ProblemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.problemService.getAll().subscribe(
      (problems: ProblemGetAll[]) => {
        this.problems = problems;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public enterSubmissionPage(problemId) {
    this.router.navigate(['problems', problemId]);
  }
}
