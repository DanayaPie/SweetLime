import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportedWebComponent } from './components/supported-web/supported-web.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { ProductListComponent } from './components/product-container/product-list/product-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'supported-web', pathMatch: 'full' }, // Redirect to supported-web or any default path
    { path: 'supported-web', component: SupportedWebComponent },
    // { path: 'product/:id', component: ProductComponent },
    // { path: 'product-list/:url', component: ProductListComponent }
    { path: 'products/:url', component: ProductContainerComponent,
        children: [
        { path: 'product/:id', component: ProductComponent },
        { path: 'product-list/:url', component: ProductListComponent },
        { path: '', redirectTo: 'product-list', pathMatch: 'full' }, // Redirect to a default child route if no child route provided
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }