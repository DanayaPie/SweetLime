import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product-container/product/product.component';
import { ProductDetailComponent } from './product-container/product/product-detail/product-detail.component';
import { PriceHistoryComponent } from './product-container/product/price-history/price-history.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigService } from './services/config.service';
import { StartUpService } from './startup/start-up.service';
import { SupportedWebComponent } from './supported-web/supported-web.component';
import { SuggestedProductComponent } from './suggested-product/suggested-product.component';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductListComponent } from './product-container/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailComponent,
    PriceHistoryComponent,
    FooterComponent,
    SupportedWebComponent,
    SuggestedProductComponent,
    ProductContainerComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
    StartUpService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
