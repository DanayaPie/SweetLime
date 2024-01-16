import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, map, of, switchMap, takeUntil } from 'rxjs';

import { Product } from 'src/app/models/product';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';
import { ProductStateService } from 'src/app/services/product-services/product-state.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnInit {
  products$!: Observable<Product[]>;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchProductService: FetchProductService,
    private productStateService: ProductStateService,
    public sharedService: SharedService,
  ) {}

  ngOnInit() {
    console.log('ProductContainerComponent - ngOnInit()');
    this.loadProductData();
  }

  private loadProductData() {
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productUrl = params.get('url');
        console.log('ProductContainerComponent - Product URL:', productUrl);
        return productUrl ? this.getProduct(productUrl) : of([]);
      })
    );

    this.products$.subscribe(products => this.handleProductData(products));
  }

  private getProduct(productUrl: string): Observable<Product[]> {
    const cachedProducts = this.productStateService.getProductFromStateByUrl(productUrl);

    if (cachedProducts && cachedProducts.length > 0) {
      console.log("ProductContainerComponent - using cached products from state");
      return of(cachedProducts);
    } else {
      console.log("ProductContainerComponent - get product from backend");
      return this.fetchProductService.fetchProductByUrl(productUrl);
    }
  }

  handleProductData(products: Product[]) {
    if (products.length >= 1) {
      console.log('ProductContainerComponent - products.length >= 1');
      this.sharedService.showProductInfo = true;
      this.sharedService.showSupportedWebError = false;
  
    } else {
      console.log('ProductContainerComponent - handleProductData - else ');
  
      this.sharedService.showSupportedWebError = true;
      this.sharedService.showProductInfo = false;
      this.sharedService.onSearchProduct(null);
      this.sharedService.supportedWebErrorMessage = "The product is not supported. Please try another product.";
      console.error('Product is not supported');
    }
  }
}
