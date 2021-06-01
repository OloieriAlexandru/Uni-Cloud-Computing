import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
	_totalAmount: number;
	card: any;
	cardHandler = this.onChange.bind(this);
	cardError: string;
	constructor(
		private cd: ChangeDetectorRef,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<PaymentPageComponent>,
		private stripeScriptTag: StripeScriptTag
	) {
		this._totalAmount = data['totalAmount'];

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
	}
	onError(error) {
		if (error.message) {
			this.cardError = error.message;
		}
	}
}
