import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-container/product-list/product-list.component';

const routes: Routes = [
    { path: 'home', component: HeaderComponent },
    { path: '', component: ProductContainerComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Add a wildcard route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }