import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { TransactionsComponent } from './modules/transactions/transactions.component';
import { MarketplaceComponent } from './modules/marketplace/marketplace.component';
import { CircularSlicePipe } from './core/pipes/circular-slice.pipe';
import { PickRandomPipe } from './core/pipes/pick-random.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseFormComponent } from './modules/marketplace/purchase-form/purchase-form/purchase-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TransactionsComponent,
    MarketplaceComponent,
    CircularSlicePipe,
    PickRandomPipe,
    PurchaseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
