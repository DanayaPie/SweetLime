import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Product } from 'src/app/models/product';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';
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
    public sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    console.log('ProductContainerComponent ngOnInit');

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.productUrl = params['url'];
      console.log('ProductContainerComponent - productUrl', this.productUrl);

      if (this.productUrl) {
        this.getProductsByUrl();
      }
    });
  }

  private getProductsByUrl(): void {
    if (this.productUrl !== null) {
      this.fetchProductService.fetchProductByUrl(this.productUrl).subscribe(
        (data) => {
          console.log('ProductContainerComponent - Products retrieved from backend', data);
          this.products = data;
          this.handleProductData();
        },
        (error) => {
          console.error('ProductContainerComponent - Error getting products:', error);
          // Handle the error as needed
        }
      );
    } else {
      console.warn('ProductContainerComponent - productUrl is null, cannot fetch products.');
      // Handle the case where productUrl is null
    }
  }
  
  handleProductData() {
    if (this.products.length === 1) {
      this.sharedService.showProductInfo = true;
      this.sharedService.showProductList = false;
      console.log('Product-container - single product', this.products);

      const productId = this.products[0].productId;
      this.sharedService.onSearchProduct(`/product/${productId}`);

    } else if (this.products.length > 1) {
      this.sharedService.showProductInfo = false;
      this.sharedService.showProductList = true;
      console.log('Product-container - 2+ products', this.products);

      const productListUrl = '/product-list/' + encodeURIComponent(this.productUrl ?? ''); // Add ?? '' to handle null
      this.sharedService.onSearchProduct(productListUrl);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
