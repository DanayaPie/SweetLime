import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Product } from "../models/product";
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    public webList: string[] = this.configService.getSupportedWebsites();
    
    private productSource = new BehaviorSubject<Product | null>(null);
    currentProduct = this.productSource.asObservable();

    showSupportedWebError = false;
    showProductContainer = false;
    showProductList = false;
    showProductInfo = false;

    constructor(
        private configService: ConfigService
    ) {}

    getWebList(): string[] {
        return this.webList;
    }

    onSearchProduct(product: Product | null): void {
        this.productSource.next(product);
    }

    reset() {
        this.showProductContainer = false;
        this.showProductList = false;
        this.showProductInfo = false;
        this.showSupportedWebError = false;
        this.onSearchProduct(null);
    }
}