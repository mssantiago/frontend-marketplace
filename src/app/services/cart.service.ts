import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new Subject<Product[]>();

  addProductToCart(product: Product) {
    this.cart = [...this.cart, product];
    this.cartSubject.next(this.cart);
  }

  removeProductFromCart(product: Product) {
    const index = this.cart.findIndex(p => p.id === product.id);

    if (index >= 0) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart);
    }
  }

  getCart() {
    return this.cartSubject.asObservable();
  }
}
