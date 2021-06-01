import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericService } from './generic.service';

import { UserNew } from '../models/UserNew';
import { UserProfile } from '../models/UserProfile';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = environment.authURL;

  constructor(private baseService: GenericService) {}

  public createUser(user: UserNew): Observable<UserNew> {
    return this.baseService.post<UserNew>(this.URL, '/register', user);
  }

  public getUserProfile(email: string): Observable<UserProfile> {
    return this.baseService.get<UserProfile>(this.URL, '/profile/' + email);
  }
}
