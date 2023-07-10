import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {
  constructor(private http: HttpClient) { }

  makePayment(card: string | undefined | null, expDate: Date | undefined | null, amount: number) {
    return this.http.post(`${environment.paymentGateway}/v1/payment`, {
      card,
      date: expDate,
      amount,
    });
  }
}
