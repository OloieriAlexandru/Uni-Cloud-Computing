import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GenericService } from './generic.service';

import { ProblemGetAll } from '../models/ProblemGetAll';
import { ProblemGetById } from '../models/ProblemGetById';

@Injectable({
  providedIn: 'root',
})
export class ProblemsService {
  private URL = environment.problemsURL;

  constructor(private baseService: GenericService) {}

  public getAll(): Observable<ProblemGetAll[]> {
    return this.baseService.get<ProblemGetAll[]>(this.URL, '/problems');
  }

  public getById(id): Observable<ProblemGetById> {
    return this.baseService.get<ProblemGetById>(this.URL, '/problems/' + id);
  }
}