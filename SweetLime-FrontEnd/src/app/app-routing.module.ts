import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { ProductComponent } from "./product-container/product/product.component";
import { StartUpResolver } from "./startup/start-up.resolver";
import { SupportedWebComponent } from "./supported-web/supported-web.component";
import { ProductListComponent } from "./product-container/product-list/product-list.component";

const routes: Routes = [
    {
        path: 'supported-web',
        component: SupportedWebComponent,
        resolve: {
            supportedWebs: StartUpResolver
        },
    },
    {
        path: 'product',
        component: ProductComponent,
    },
    {
        path: 'products',
        component: ProductListComponent,
    },
    {
        path: 'products/:productId',
        component: ProductComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}
