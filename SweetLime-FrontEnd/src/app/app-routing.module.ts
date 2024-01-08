import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-container/product-list/product-list.component';

const routes: Routes = [
    { path: 'home', component: HeaderComponent },
    { path: 'product/:id', component: ProductContainerComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }