import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
  products: Product[] = [];
  productUrl: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fetchProductService: FetchProductService,
    private productStateService: ProductStateService,
    public sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('ProductContainerComponent ngOnInit');

    // Subscribe to changes in the current product URL
    this.sharedService.currentProduct.pipe(takeUntil(this.destroy$)).subscribe(url => {
      if (url) {
        this.productUrl = url;
        this.getProductsByUrl();
      }
    });
  }

  private getProductsByUrl(): void {
    const decodedUrl = decodeURIComponent(this.productUrl!);

    this.fetchProductService.fetchProductByUrl(decodedUrl).subscribe(
      (data) => {
        console.log('ProductContainerComponent - Products retrieved from backend', data);
        this.products = data;
        this.handleProductData();
      },
      (error) => {
        console.error('ProductContainerComponent - Error getting products:', error);
        this.handleProductData();
      }
    );
  }

  handleProductData() {
    console.log("Product-container - handleProductData()")

    if (this.products.length > 1) {
      console.log('Product-container - productsToDisplay', this.products);

      const productsToDisplay = `/products/${this.productUrl}`;
      this.sharedService.onSearchProduct(productsToDisplay);

      this.sharedService.showProductInfo = true;
      this.sharedService.showSupportedWebError = false;
      
    } else {
      this.sharedService.showSupportedWebError = true;
      this.sharedService.showProductInfo = false;
      this.sharedService.onSearchProduct(null);

      this.sharedService.supportedWebErrorMessage = "The product is not supported. Please try another product.";
      console.error('Product is not supported', this.products);
    }
  }
  
  /* 
    Handle product data for product list and product components
    -- Issues:
      - product and product list components are displayed and immediately disappeared
  */
/*   handleProductData() {
    if (this.products.length === 1) {
      const singleProduct = this.products[0];

      // save product id and url to the client-side state
      this.sharedService.onSearchProduct(`/products/product/${singleProduct.productId}`);
      // this.productStateService.saveProductToState(singleProduct.productId, singleProduct);

      this.sharedService.showProductInfo = true;
      this.sharedService.showProductList = false;
      this.sharedService.showSupportedWebError = false;
      console.log('Product-container - single product', this.products);

    } else if (this.products.length > 1) {
      
      // saving each product to client-side state
      // this.products.forEach(product => this.productStateService.saveProductToState(product.productId, product));

      const productListUrl = `/products/product-list/${this.productUrl}`;
      this.sharedService.onSearchProduct(productListUrl);

      this.sharedService.showProductList = true;
      this.sharedService.showProductInfo = false;
      this.sharedService.showSupportedWebError = false;
      console.log('Product-container - 2+ products', this.products);

    } else if (this.products.length === 0 ) {
      this.sharedService.showSupportedWebError = true;
      this.sharedService.showProductInfo = false;
      this.sharedService.showProductList = false;
      this.sharedService.onSearchProduct(null);

      this.sharedService.supportedWebErrorMessage = "The product is not supported. Please try another product.";
      console.error('Product is not supported', this.products);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  } */
}
