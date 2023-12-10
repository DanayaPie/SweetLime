import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { ProductComponent } from "./product/product.component";
import { StartUpResolver } from "./startup/start-up.resolver";
import { SupportedWebComponent } from "./supported-web/supported-web.component";

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}
