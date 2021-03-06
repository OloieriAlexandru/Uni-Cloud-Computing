import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SubscriptionPrices } from 'src/app/models/SubscriptionPrices';

import { PaymentPageComponent } from '../../components/payment-popup/payment.component';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss'],
})
export class PremiumPageComponent {
  public monthly = SubscriptionPrices.MONTHLY;
  public yearly = SubscriptionPrices.YEARLY;

  constructor(private readonly matDialog: MatDialog) {}

  checkout(amount: SubscriptionPrices) {
    const dialogRef = this.matDialog.open(PaymentPageComponent, {
      data: { totalAmount: amount },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result.token.id);
      }
    });
  }
}
