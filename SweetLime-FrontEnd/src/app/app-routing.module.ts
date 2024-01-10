import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-container/product-list/product-list.component';
import { SupportedWebComponent } from './components/supported-web/supported-web.component';
import { ProductComponent } from './components/product-container/product/product.component';

const routes: Routes = [
    { path: '', redirectTo: '/supported-web', pathMatch: 'full' }, // Redirect to supported-web or any default path
    { path: 'product/:id', component: ProductComponent },
    { path: 'product-list/:url', component: ProductListComponent },
    { path: 'supported-web', component: SupportedWebComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }