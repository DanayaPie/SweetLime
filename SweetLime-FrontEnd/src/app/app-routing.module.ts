import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportedWebComponent } from './components/supported-web/supported-web.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductDetailListComponent } from './components/product-container/product-detail-list/product-detail-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'supported-web', pathMatch: 'full' },
    { path: 'supported-web', component: SupportedWebComponent },
    { path: 'products/:url', component: ProductContainerComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}