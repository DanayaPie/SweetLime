import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    public webList: string[] = ['stylevana.com'];
    
    private productSource = new BehaviorSubject<Product | null>(null);
    currentProduct = this.productSource.asObservable();

    showSupportedWebError = false;
    showProductContainer = false;
    showProductList = false;
    showProductInfo = false;

    setWebList(supportedWebs: any[]): void {
        this.webList = supportedWebs.map(web => web.domainName);
        // console.log('Web List: ', this.webList);
    }

    getWebList(): string[] {
        return this.webList;
    }

    changeProduct(product: Product | null): void {
        this.productSource.next(product);
    }

    reset() {
        this.showProductContainer = false;
        this.showProductList = false;
        this.showProductInfo = false;
        this.showSupportedWebError = false;
        this.changeProduct(null);
    }
}