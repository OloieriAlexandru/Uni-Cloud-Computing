import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GenericService } from './generic.service';

import { ProblemGetAll } from '../models/ProblemGetAll';
import { ProblemGetById } from '../models/ProblemGetById';
import { ProblemApproval } from '../models/ProblemApproval';
import { ProblemSolution } from '../models/ProblemSolution';
import { ProblemIndications } from '../models/ProblemIndications';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  private URL = environment.problemsURL;

  constructor(private baseService: GenericService) {}

  public getAll(): Observable<ProblemGetAll[]> {
    return this.baseService.get<ProblemGetAll[]>(this.URL, '/problems');
  }
  public getAllPending(): Observable<ProblemGetAll[]> {
    return this.baseService.get<ProblemGetAll[]>(this.URL, '/pending');
  }
  public getById(id): Observable<ProblemGetById> {
    return this.baseService.get<ProblemGetById>(this.URL, '/problems/' + id);
  }
  public upload(newProblem: FormData): Observable<any> {
    return this.baseService.postAlt<FormData>(this.URL, '/upload', newProblem);
  }
  public approve(response: ProblemApproval, id: any): Observable<any> {
    return this.baseService.patch<ProblemApproval>(
      this.URL,
      '/pending/' + id,
      response
    );
  }
  public getSolution(id): Observable<ProblemSolution> {
    return this.baseService.get<ProblemSolution>(
      this.URL,
      '/problems/' + id + '/solution'
    );
  }
  public getIndications(id): Observable<ProblemIndications> {
    return this.baseService.get<ProblemIndications>(
      this.URL,
      '/problems/' + id + '/indications'
    );
  }
}
