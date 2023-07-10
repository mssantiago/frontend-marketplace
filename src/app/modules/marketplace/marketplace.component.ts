import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ClientSearchEngineService } from 'src/app/services/client-search-engine.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  products: Product[] = [];
  
  currentPosInCarousel: number = 0;

  filteredProducts: Product[] = [];
  query: string | undefined;
  clientSearchEngine: ClientSearchEngineService;
  mapTitlesToProducts: { [index: string]: Product[] };

  productImageStatus: { [index: number]: 'Loading' | 'Success' | 'Failed' };

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.clientSearchEngine = new ClientSearchEngineService;
    this.mapTitlesToProducts = {};
    this.productImageStatus = {};
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
        this.clientSearchEngine.initSearchEngine(products.map(p => p.title));
        this.mapTitlesToProducts = products.reduce<{ [index: string]: Product[] }>((map, p) => {
          const normalizedTitle = p.title.toLowerCase().trim();
          map[normalizedTitle] = [...(map[normalizedTitle] ?? []), p];
          return map;
        }, {});
        this.productImageStatus = products.map(p => p.id).reduce<{ [index: number]: 'Loading' | 'Success' | 'Failed' }>((map, id) => {
          map[id] = 'Loading';
          return map;
        }, {});
    });
  }

  moveCarousel(offset: number) {
    if (this.currentPosInCarousel + offset < 0) {
      this.currentPosInCarousel = this.products.length - 1;
    } else {
      this.currentPosInCarousel = (this.currentPosInCarousel + offset) % this.products.length;
    }
  }

  setImagePreviewStatus(productId: number, status: 'Loading' | 'Success' | 'Failed') {
    this.productImageStatus[productId] = status;
  }

  searchProduct() {
    if (!this.query) {
      this.filteredProducts = this.products;
      return;
    }
    const matches = this.clientSearchEngine.query(this.query);

    this.filteredProducts = matches
      .map(m => this.mapTitlesToProducts[m])
      .flat();
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}
