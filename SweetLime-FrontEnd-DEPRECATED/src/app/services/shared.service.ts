import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, of, switchMap } from "rxjs";

import { ConfigService } from "./config.service";
import { FetchProductService } from "./product-services/fetch-product.service";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    showSupportedWebError = false;
    showProductContainer = false;
    showProductList = false;
    showProductInfo = false;
    supportedWebErrorMessage: string = '';

    public webList: string[] = this.configService.getSupportedWebsites();
    
    private productSource = new BehaviorSubject<string | null>(null);
    currentProduct: Observable<string | null> = this.productSource.asObservable();
    
    constructor(
        private configService: ConfigService,
        private fetchProductService: FetchProductService
    ) {}

    getWebList(): string[] {
        return this.webList;
    }

    onSearchProduct(encodedUrl: string | null): Observable<Product[]> {
        console.log('SharedService - Current product URL:', encodedUrl);
        this.productSource.next(encodedUrl);

        return this.currentProduct.pipe(
            switchMap(encodedUrl => this.fetchProductService.fetchProductByUrl(encodedUrl!)),
            map(products => {
                if (products.length > 0) {
                    console.log('SharedService - products.length >= 1');
                    console.log('SharedService - products', products);
                    this.showProductContainer = true;
                    this.showProductInfo = true;
                } else {
                    console.log('SharedService - handleProductData - else ');
                    this.resetSearchProductFrom();
                }

                return of(products);
            })
        )
    }

    updateCurrentProduct(productUrl: string) {
        this.productSource.next(productUrl);
    }

    resetSearchProductFrom() {
        this.showProductContainer = false;
        this.showProductList = false;
        this.showProductInfo = false;
        this.showSupportedWebError = false;
        this.productSource.next(null); // set the current product to null
    }
}