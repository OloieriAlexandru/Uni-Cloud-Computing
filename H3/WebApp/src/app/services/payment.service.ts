import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GenericService } from './generic.service';
import { PaymentData } from '../models/PaymentData';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private URL = environment.paymentURL;

  constructor(private baseService: GenericService) {}

  public processPayment(paymentData: PaymentData): Observable<any> {
    console.log(paymentData);
    return this.baseService.postAlt<PaymentData>(this.URL, '/charge', paymentData);
  }

}
