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

    showProductContainer = false;
    showSupportedWebError = false;

    setWebList(supportedWebs: any[]): void {
        this.webList = supportedWebs.map(web => web.domainName);
        // console.log('Web List: ', this.webList);
    }

    getWebList(): string[] {
        return this.webList;
    }

    changeProduct(product: Product ): void {
        this.productSource.next(product);
    }
}