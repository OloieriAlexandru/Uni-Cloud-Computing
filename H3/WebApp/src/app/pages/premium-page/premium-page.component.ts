import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProblemsService } from 'src/app/services/problems.service';

import { ProblemGetById } from 'src/app/models/ProblemGetById';
import { UserRoles } from 'src/app/models/UserRoles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss'],
})
export class PremiumPageComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
}
