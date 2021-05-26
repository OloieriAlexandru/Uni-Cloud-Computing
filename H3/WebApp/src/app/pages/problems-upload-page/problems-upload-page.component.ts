import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemNew } from 'src/app/models/ProblemNew';

import { ProblemsService } from 'src/app/services/problems.service';


@Component({
  selector: 'app-problems-upload-page',
  templateUrl: './problems-upload-page.component.html',
  styleUrls: ['./problems-upload-page.component.scss'],
})
export class ProblemsUploadPageComponent{
  public newProblem: ProblemNew = new ProblemNew();
  public formData: FormData = new FormData();
  constructor(
    @Inject('M') private M: any,
    private problemService: ProblemsService,
    private router: Router
  ) {}

  handleInFiles(files: FileList) {
    let i;
    for (i=0; i<files.length; i++){
      this.formData.append("inFiles", files.item(i), files.item(i).name)
    }
  }

  handleOutFiles(files: FileList) {
    let i;
    for (i=0; i<files.length; i++){
      this.formData.append("outFiles", files.item(i), files.item(i).name)
    }
  }

  public upload() {
    Object.keys(this.newProblem).forEach(key => this.formData.append(key, this.newProblem[key]));
    this.problemService.upload(this.formData).subscribe(
      (res) => {
        this.newProblem = new ProblemNew();
        this.formData = new FormData();
        this.M.toast({
          html: 'Problem uploaded successfully!',
          classes: 'green darken-3',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}