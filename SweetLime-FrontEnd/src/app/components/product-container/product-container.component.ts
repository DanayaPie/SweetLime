import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, Subject, distinctUntilChanged, distinctUntilKeyChanged, filter, map, mergeMap, of, switchMap, takeUntil } from 'rxjs';

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
    public sharedService: SharedService,
  ) {}

  ngOnInit() {
    console.log('ProductContainerComponent - ngOnInit()');
    
    // Subscribe to router events
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
    ).subscribe(event => {
      console.log('Router Event:', event);
    });

    this.products$ = this.route.paramMap.pipe(
      map(params => params.get('url') as string),
      distinctUntilChanged(), // only emit when 'url' parameter changes
      switchMap(encodedProductUrl => {
        console.log('ProductContainerComponent - Product URL:', encodedProductUrl);
        return encodedProductUrl ? this.getProduct(encodedProductUrl) : of([]);
      })
    );

    this.products$.subscribe(products => this.handleProductData(products));
  }

  private getProduct(encodedProductUrl: string): Observable<Product[]> {
    console.log("ProductContainerComponent - get product from backend");
    return this.fetchProductService.fetchProductByUrl(encodedProductUrl);
  }

  handleProductData(products: Product[]) {
    if (products.length >= 1) {
      console.log('ProductContainerComponent - products.length >= 1');
      this.sharedService.showProductInfo = true;
      this.sharedService.showSupportedWebError = false;
  
    } else {
      console.log('ProductContainerComponent - handleProductData - else ');
  
      this.router.navigate(['supported-web']);
      this.sharedService.showSupportedWebError = true;
      this.sharedService.showProductContainer = false;
      this.sharedService.showProductInfo = false;
      this.sharedService.onSearchProduct(null);
      this.sharedService.supportedWebErrorMessage = "The product is not supported. Please try another product.";
      console.error('Product is not supported');
    }
  }
}
