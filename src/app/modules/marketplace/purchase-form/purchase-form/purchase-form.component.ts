import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  @Input()
  amount: number = 0;

  paymentForm = new FormGroup({
    name: new FormControl(''),
    card: new FormControl(''),
    expDate: new FormControl(new Date())
  });

  constructor(
    private paymentGatewayService: PaymentGatewayService
  ) {

  }

  makePayment() {
    if (this.paymentForm.invalid) {
      return;
    }
    const { card, expDate } = this.paymentForm.value;

    this.paymentGatewayService.makePayment(card, expDate, this.amount)
      .pipe(
        catchError((err) => {
          alert('No se pudo realizar el pago');
          return throwError(() => new Error(err));
        })
      )
      .subscribe(() => {
        alert('Pago exitoso');
      });
  }
}
