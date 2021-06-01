import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemIndications } from 'src/app/models/ProblemIndications';

@Component({
  selector: 'app-indications-page',
  templateUrl: './indications-page.component.html',
  styleUrls: ['./indications-page.component.scss'],
})
export class IndicationsPageComponent implements OnInit {
  public problemId: string;
  public indications: ProblemIndications = null;
  private routeCase;

  constructor(
    private problemsService: ProblemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.routeCase = this.route.snapshot.paramMap.get('case');
    console.log(this.routeCase);
    this.problemsService.getIndications(this.problemId).subscribe(
      (indications: ProblemIndications) => {
        this.indications = indications;
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
