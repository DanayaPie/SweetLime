import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { ProductDetailComponent } from './components/product-container/product/product-detail/product-detail.component';
import { PriceHistoryComponent } from './components/product-container/product/price-history/price-history.component';
import { SupportedWebComponent } from './components/supported-web/supported-web.component';
import { SuggestedProductComponent } from './components/suggested-product/suggested-product.component';
import { ProductListComponent } from './components/product-container/product-list/product-list.component';
import { SupportedWebsiteCheckService } from './services/supported-website-check.service';
import { ProductContainerComponent } from './components/product-container/product-container.component';


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
    ReactiveFormsModule,
  ],
  providers: [
    ConfigService,
    SupportedWebsiteCheckService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
