import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  navigationMenuOptions: { title: string, link: string } [] = [
    {
      title: 'Transacciones',
      link: '/transactions'
    },
    {
      title: 'Marketplace',
      link: '/marketplace'
    }
  ];

  numberOfProductsInCart: number = 0;
  isCartVisible: boolean | undefined;

  cart: Product[] = [];

  constructor(
    private cartService: CartService
  ) {
    this.cartService.getCart()
      .subscribe(products => {
        this.numberOfProductsInCart = products.length;
        this.cart = products;
    }); 
  }

  showCart(): void {
    this.isCartVisible = true;
  }

  hideCart(): void {
    this.isCartVisible = false;
  }

  removeProductFromCart(product: Product): void {
    this.cartService.removeProductFromCart(product);
  }

  getPurchasePrice(): number {
    return this.cart.reduce((price, p) => price + p.price, 0);
  }
}
