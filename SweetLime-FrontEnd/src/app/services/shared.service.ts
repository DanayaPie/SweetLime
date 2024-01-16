import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Product } from "../models/product";
import { ConfigService } from "./config.service";

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
    
    private currentProductSource = new BehaviorSubject<string | null>(null);
    currentProduct: Observable<string | null> = this.currentProductSource.asObservable();
    
    constructor(
        private configService: ConfigService
    ) {}

    getWebList(): string[] {
        return this.webList;
    }

    onSearchProduct(url: string | null): void {
        console.log('SharedService - Current product URL:', url);
        this.currentProductSource.next(url);
    }    

    updateCurrentProduct(productUrl: string) {
        this.currentProductSource.next(productUrl);
    }

    resetSearchProductFrom() {
        this.showProductContainer = false;
        this.showProductList = false;
        this.showProductInfo = false;
        this.showSupportedWebError = false;
        this.onSearchProduct(null);
        // this.productSource.next(null); // set the current product to null
    }
}