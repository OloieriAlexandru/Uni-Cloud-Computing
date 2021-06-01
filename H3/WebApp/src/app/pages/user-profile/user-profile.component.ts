import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubmissionsService } from 'src/app/services/submissions.service';
import { UserService } from 'src/app/services/user.service';

import { UserProfile } from 'src/app/models/UserProfile';
import { EvaluationGetAll } from 'src/app/models/EvaluationGetAll';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public userProfile: UserProfile = null;

  constructor(
    private submissionsService: SubmissionsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let userEmail = this.route.snapshot.paramMap.get('userEmail');
    this.userService.getUserProfile(userEmail).subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;

        this.submissionsService.getForUser(userEmail, '1', '100').subscribe(
          (evaluations: EvaluationGetAll[]) => {
            this.userProfile.evaluations = evaluations;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public enterSubmissionDetailsPage(submissionId) {
    this.router.navigate(['submission', submissionId]);
  }

  public getSubmissionsTableHeader() {
    if (this.userProfile) {
      return `${this.userProfile.username}'s submissions`;
    }
    return "User's submissions";
  }
}
