import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductListComponent } from './components/product-container/product-list/product-list.component';
import { SupportedWebComponent } from './components/supported-web/supported-web.component';

const routes: Routes = [
    { path: '', redirectTo: '/supported-web', pathMatch: 'full' }, // Redirect to supported-web or any default path
    { path: 'product/:id', component: ProductContainerComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'supported-web', component: SupportedWebComponent },
    { path: '**', redirectTo: '/supported-web', pathMatch: 'full' }, // Redirect to supported-web for unknown paths
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }