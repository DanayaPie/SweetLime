import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    public webList: string[] = ['stylevana.com'];

    showProductComponent = false;
    supportedProduct = false;

    private currentProductSubject: BehaviorSubject<Product | null>  = new BehaviorSubject<Product | null>(null);
    currentProduct: Observable<Product | null> = this.currentProductSubject.asObservable();

    private currentProductListSubject: BehaviorSubject<Product[] | null>  = new BehaviorSubject<Product[] | null>(null);
    currentProductList: Observable<Product[] | null> = this.currentProductListSubject.asObservable();


    setWebList(supportedWebs: any[]): void {
        this.webList = supportedWebs.map(web => web.domainName);
        // console.log('Web List: ', this.webList);
    }

    getWebList(): string[] {
        return this.webList;
    }

    onProductRetrieved(product: Product ): void {
        console.log('onProductRetrieved')
        this.currentProductSubject.next(product);
    }

    onProductListRetrieved(products: Product[]): void {
        console.log('onProductListRetrieved')
        this.currentProductListSubject.next(products);
    }
}