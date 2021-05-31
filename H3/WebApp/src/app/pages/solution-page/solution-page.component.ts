import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemSolution } from 'src/app/models/ProblemSolution';

import { ProblemsService } from 'src/app/services/problems.service';

@Component({
  selector: 'app-solution-page',
  templateUrl: './solution-page.component.html',
  styleUrls: ['./solution-page.component.scss'],
})
export class SolutionPageComponent implements OnInit {
  public problemId: string;
  public solution: ProblemSolution;
  public routeCase;

  constructor(
    private problemsService: ProblemsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.routeCase = this.route.snapshot.paramMap.get('case');
    this.problemsService.getSolution(this.problemId).subscribe(
      (solution: ProblemSolution) => {
        this.solution = solution;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  back(): void {
    this.router.navigate([this.routeCase, this.problemId]);
  }

}
