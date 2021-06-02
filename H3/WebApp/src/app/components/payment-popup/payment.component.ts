import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtRefreshTokenInfo } from "src/app/models/JwtRefreshTokenInfo";
import { AuthService } from "src/app/services/auth.service";
import { PaymentService } from "src/app/services/payment.service";
import { environment } from "src/environments/environment";
import { StripeScriptTag } from "stripe-angular";

//followed the tutorial here https://betterprogramming.pub/payments-simplified-stripe-angular-express-4a88bf69f82e
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
    private readonly superM: MatSnackBar,
  ) {
    this.totalAmount = data['totalAmount'];

    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey(environment.stripePublicKey);
    }

  }
  ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
  ngAfterViewInit() {
    this.initiateCardElement();
  }
  initiateCardElement() {
    this.card = this.stripeScriptTag.StripeInstance.elements().create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }
  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }
  async createStripeToken() {
    const { token, error } = await this.stripeScriptTag.StripeInstance.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }
  onSuccess(token) {
    this.dialogRef.close({ token });
    const userTokenInfo: JwtRefreshTokenInfo = this.authService.getRefreshTokenInfo();
    if (userTokenInfo === null) this.onError(new Error("Cannot get user info"));
    this.paymentService.processPayment({ email: userTokenInfo.email, amount: this.totalAmount, stripeToken: token.id }).subscribe(
      (res) => {
        this.superM.open(
          '🎉🎉 Payment successful, you will be redirected to the login page ✅',
          'Thanks for supporting us!',
          { duration: 5000 }
        );
        this.authService.logout();
      },
      (err) => {
        console.log(err)
        this.superM.open('Payment failed', 'Oh no! 💁‍♀️', { duration: 5000 });
      }
    );
  }
  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
