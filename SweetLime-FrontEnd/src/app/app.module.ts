import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PriceHistoryComponent } from './product/price-history/price-history.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigService } from './services/config.service';
import { StartUpService } from './startup/start-up.service';
import { SupportedWebComponent } from './supported-web/supported-web.component';
import { SuggestedProductComponent } from './suggested-product/suggested-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailComponent,
    PriceHistoryComponent,
    FooterComponent,
    SupportedWebComponent,
    SuggestedProductComponent
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
