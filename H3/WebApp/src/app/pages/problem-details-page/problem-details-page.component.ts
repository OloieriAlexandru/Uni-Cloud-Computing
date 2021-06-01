import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetById } from 'src/app/models/ProblemGetById';
import { UserRoles } from 'src/app/models/UserRoles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-problem-details-page',
  templateUrl: './problem-details-page.component.html',
  styleUrls: ['./problem-details-page.component.scss'],
})
export class ProblemDetailsPageComponent implements OnInit {
  public problem: ProblemGetById = null;
  public problemId: string = null;
  private role: UserRoles;
  private roleObservable;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private problemService: ProblemsService,
    private authService: AuthService
  ) {
    this.roleObservable = this.authService
      .getRoleObservable()
      .subscribe((newRole) => {
        this.role = newRole;
      });
  }

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

  public getIndications(): void {
    if (this.role == UserRoles.BASIC) {
      this.router.navigate(['premium']);
      return;
    }
    this.router.navigate(['problems', this.problemId, 'indications']);
  }
  public getSolution(): void {
    if (this.role == UserRoles.BASIC) {
      this.router.navigate(['premium']);
      return;
    }
    this.router.navigate(['problems', this.problemId, 'solution']);
  }
}
