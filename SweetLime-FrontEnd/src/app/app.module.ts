import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PriceHistoryComponent } from './product/price-history/price-history.component';
import { StylevanaComponent } from './suggested-products/stylevana/stylevana.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { StartUpService } from './services/startup.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    SuggestedProductsComponent,
    ProductDetailComponent,
    PriceHistoryComponent,
    StylevanaComponent,
    FooterComponent
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
