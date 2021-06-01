import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetById } from 'src/app/models/ProblemGetById';
import { ProblemApproval } from 'src/app/models/ProblemApproval';

@Component({
  selector: 'app-pending-problem-details-page',
  templateUrl: './pending-problem-details-page.component.html',
  styleUrls: ['./pending-problem-details-page.component.scss'],
})
export class PendingProblemDetailsPageComponent implements OnInit {
  public problem: ProblemGetById = null;
  public problemId: string = null;
  public readonly approvedResponse: ProblemApproval = new ProblemApproval(true);
  public readonly rejectedResponse: ProblemApproval = new ProblemApproval(
    false
  );

  constructor(
    private readonly superM: MatSnackBar,
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

  public approveProblem(response: ProblemApproval): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.problemService.approve(response, this.problemId).subscribe(
      (result: any) => {
        this.superM.open(
          `🎉🎉 Problem ${
            response.approved === true ? 'approved' : 'rejected'
          } successfully! ✅`,
          'You beast!',
          { duration: 5000 }
        );
      },
      (err) => {
        this.superM.open('Something went wrong', 'Oopsie', { duration: 5000 });
      }
    );
  }
  public getIndications(): void {
    this.router.navigate(['pending', this.problemId, 'indications']);
  }
  public getSolution(): void {
    this.router.navigate(['pending', this.problemId, 'solution']);
  }
}
