import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StripeScriptTag } from 'stripe-angular';

import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

import { JwtRefreshTokenInfo } from 'src/app/models/JwtRefreshTokenInfo';

import { environment } from 'src/environments/environment';
import { SnackbarComponent } from '../snack-bar/snack-bar.component';

// followed the tutorial here https://betterprogramming.pub/payments-simplified-stripe-angular-express-4a88bf69f82e
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PaymentPageComponent>,
    private stripeScriptTag: StripeScriptTag,
    private authService: AuthService,
    private paymentService: PaymentService,
    private readonly superM: MatSnackBar
  ) {
    this.totalAmount = data['totalAmount'];

    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey(environment.stripePublicKey);
    }
  }

  public ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  public ngAfterViewInit() {
    this.initiateCardElement();
  }

  public initiateCardElement() {
    this.card = this.stripeScriptTag.StripeInstance.elements().create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  public onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  async createStripeToken() {
    const { token, error } =
      await this.stripeScriptTag.StripeInstance.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }

  public onSuccess(token) {
    this.dialogRef.close({ token });
    const userTokenInfo: JwtRefreshTokenInfo = this.authService.getRefreshTokenInfo();
    if (userTokenInfo === null) this.onError(new Error("Cannot get user info"));
    this.paymentService.processPayment({ email: userTokenInfo.email, amount: this.totalAmount, stripeToken: token.id }).subscribe(
      (res) => {
        this.superM.openFromComponent(SnackbarComponent,
          {
            duration: 5000, data:
              { error: false, message: 'Payment successful, you will be redirected to the login page' },
            panelClass: ['style-success']
          }
        );

        this.authService.logout();
      },
      (err) => {
        this.superM.openFromComponent(SnackbarComponent,
          {
            duration: 5000, data:
              { error: true, message: 'Oh no! Something went wrong' },
            panelClass: ['style-error']
          }
        );
      }
    );
  }

  public onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
