import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericService } from './generic.service';

import { PaymentData } from '../models/PaymentData';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private URL = environment.paymentsURL;

  constructor(private baseService: GenericService) {}

  public processPayment(paymentData: PaymentData): Observable<any> {
    return this.baseService.postAlt<PaymentData>(
      this.URL,
      '/charge',
      paymentData
    );
  }
}
