import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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
    
    private productSource = new BehaviorSubject<string | null>('/'); // Set a default value
    currentProduct = this.productSource.asObservable();

    constructor(
        private configService: ConfigService
    ) {}

    getWebList(): string[] {
        return this.webList;
    }

    onSearchProduct(url: string | null): void {
        this.productSource.next(url);
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