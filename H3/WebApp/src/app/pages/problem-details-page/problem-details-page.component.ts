import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetById } from 'src/app/models/ProblemGetById';

@Component({
  selector: 'app-problem-details-page',
  templateUrl: './problem-details-page.component.html',
  styleUrls: ['./problem-details-page.component.scss'],
})
export class ProblemDetailsPageComponent implements OnInit {
  public problem: ProblemGetById = null;
  public problemId: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private problemService: ProblemsService
  ) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.problemService.getById(this.problemId).subscribe(
      (problem: ProblemGetById) => {
        this.problem = problem;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public submitSolution(): void {
    this.router.navigate(['problems', this.problemId, 'submit']);
  }
}
