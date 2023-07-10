import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './modules/transactions/transactions.component';
import { MarketplaceComponent } from './modules/marketplace/marketplace.component';

const routes: Routes = [
  {
    path: 'marketplace',
    component: MarketplaceComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: '**',
    redirectTo: '/marketplace'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
