import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GenericService } from './generic.service';

import { EvaluationGetAll } from '../models/EvaluationGetAll';
import { EvaluationGetById } from '../models/EvaluationGetById';
import { EvaluationCreate } from '../models/EvaluationCreate';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private CREATE_EVALUATION_URL = environment.evaluationURL;
  private EVALUATIONS_API_URL = environment.evaluationsURL;

  constructor(private baseService: GenericService) {}

  public getAll(): Observable<EvaluationGetAll[]> {
    return this.baseService.get<EvaluationGetAll[]>(
      this.EVALUATIONS_API_URL,
      '/evaluations'
    );
  }

  public getById(id): Observable<EvaluationGetById> {
    return this.baseService.get<EvaluationGetById>(
      this.EVALUATIONS_API_URL,
      '/evaluations/' + id
    );
  }

  public create(
    evaluationSubmission: EvaluationCreate
  ): Observable<EvaluationCreate> {
    return this.baseService.post<EvaluationCreate>(
      this.CREATE_EVALUATION_URL,
      '',
      evaluationSubmission
    );
  }

  public getForUser(
    email: string,
    page: string,
    pageSize: string
  ): Observable<EvaluationGetAll[]> {
    return this.baseService.get<EvaluationGetAll[]>(
      this.EVALUATIONS_API_URL,
      'evaluations/users/' + email + '?page=' + page + '?pageSize=' + pageSize
    );
  }
}
