import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';

import { ConfigService } from './config.service';
import { Product } from '../models/product';
import { oneProductHardCoded } from './hardcoded/one-product-hardcoded';
import { twoProductHardCoded } from './hardcoded/two-product-hardcoded';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl: string;

    // defined productMap as Map
    private productMap: Map<string, Product> = new Map<string, Product>();

    constructor (
        private configService: ConfigService, 
        private http: HttpClient
    ) {
        this.apiUrl = this.configService.getApiUrl();
    }

    /* 
        Hardcoded Products 
        -- For development and testing purposes, return hardcoded data based on the provided productUrl
    */ 
    fetchProductByUrl(productUrl: string): Observable<Product[]> {
        console.log("Product Service - Hardcoded fetchProductByUrl:", productUrl);
    
        // check if product is available in client-side state
        const cachedProduct = this.getProductFromStateByUrl(productUrl);

        if (cachedProduct) {
            console.log("Product Service - using cached product from state");
            return of([cachedProduct]);
        } else {
            console.log("Product Service - fetching hardcoded product");

            let productObservable: Observable<Product[]>;

            if (productUrl.toLowerCase().includes('numbuz-n')) {
                console.log("Product Service - Using oneProductHardCoded");
                productObservable = of(oneProductHardCoded);
    
            } else if (productUrl.toLowerCase().includes('beauty-of-joseon')) {
                console.log("Product Service - Using twoProductHardCoded");
                productObservable =  of(twoProductHardCoded);
            } else {
                console.error("No matching condition and product not found in client state");
                return throwError("Product not found");
            }

            // Save fetched product to client-side state
            productObservable.subscribe(products => {
                if (products.length > 0) {
                    products.forEach(product => {
                        this.saveProductToState(product.productId, product);
                    })
                }
            });

            return productObservable;
        }
    }

    /*
        Fetch Product from Database
    */
    // fetchProductByUrl(productUrl: string): Observable<Product[]> {
    //     console.log("Product Service - backend fetchProductByUrl:", productUrl);

    //     const requestBody = { productUrl };
    //     const getProductByUrl = `${this.apiUrl}/productUrl`;

    //     // check if product are already available in client-side state
    //     const cachedProduct = this.getProductFromStateByUrl(productUrl);

    //     if (cachedProduct) {
    //         // return cached product
    //         return of ([cachedProduct]);

    //     } else {

    //         // fetch product from backend
    //         return this.http.post<Product>(getProductByUrl, requestBody).pipe(
    //             map((data: any) => {
    //                 if (data && Array.isArray(data)) {

    //                     const products = data.map((productData: any) => {
    
    //                         // map productData to Product model
    //                         const product: Product = {
    //                             productId: productData.productId,
    //                             productName: productData.productName,
    //                             productUrl: productData.productUrl,
    //                             createdDate: new Date(this.convertEpochToLocalDate(productData.createdDate)),
    //                             deletedDate: new Date(this.convertEpochToLocalDate(productData.deleteDate)),
    //                             imagePath: productData.imagePath,
    //                             options: this.extractOptions(productData.options),
    //                             priceHistory: this.convertPriceHistory(productData.priceHistory),
    //                             newestPrice: this.extractNewestPrice(productData.priceHistory),
    //                             webdomain: this.extractWebdomain(productData.productUrl)
    //                         };
    
    //                         // save product to client-side state
    //                         this.saveProductToState(product.productId, product);
        
    //                         return product;
    //                     });

    //                     return products;
    //                 } else {
    //                     console.error('Invalid response format:', data);
    //                     return [];
    //                 }
    //             })
    //         );
    //     }
    // }

    private convertEpochToLocalDate(epoch: number): string {
        return epoch ? new Date(epoch * 1000).toLocaleDateString() : '';
    }

    private extractOptions(optionsData: any): { [key: string]: string; } {
        // map all key and value from options
        return Object.entries(optionsData).reduce((result: { [key: string]: string}, [key, value]) => {
            result[key] = String(value);
            return result;
        }, {});
    }

    private convertPriceHistory(priceHistoryData: any[]): any[] {
        return priceHistoryData.map((priceData) => {
            return {
                Price: priceData.Price / 100,
                UpdatedDate: new Date(this.convertEpochToLocalDate(priceData.UpdatedDate)),
            };
        });
    }

    private extractNewestPrice(priceHistoryData: any[]): number {
        if (priceHistoryData.length > 0) {
            // reduce iterates over each element of array, applying a specified callback function
            const mostRecentPrice = priceHistoryData.reduce((latest, price) => {
                
                /*  Callback function executed on each ele of priceHistory[] during reduce operation.
                    It compares the UpdatedDate of each 'price' object with the UpdatedDate of the 'latest' object.
                    This effectively find the object with the maximum UpdatedDate.
                */
                return price.UpdatedDate > latest.UpdatedDate ? price : latest;
            }, priceHistoryData[0]);

            return mostRecentPrice.Price / 100;
        }

        // return default value or handle the case where priceHistoryData is empty
        return 0;
    }

    
    private extractWebdomain(productUrl: string): string {
        const url = new URL(productUrl ?? "");
        const domainParts = url.hostname.split('.');

        // Exclude the first part if it's 'www' and get the second part (main domain)
        return domainParts.length > 1 && domainParts[0].toLowerCase() === 'www'
        // regex matches first word character in the string and replace it with uppercase
        ? domainParts[1].replace(/^\w/, match => match.toUpperCase())
        : domainParts[0].replace(/^\w/, match => match.toUpperCase());
    }

    getProductFromStateByUrl(productUrl: string): Product | undefined {
        for (const product of this.productMap.values()) {
            if (product.productUrl === productUrl) {
                return product;
            }
        }

        return undefined;
    }

    getProductFromStateById(productId: string): Product | undefined {
        return this.productMap.get(productId);
    }

    hasProduct(productId: string): boolean {
        return this.productMap.has(productId);
    }

    saveProductToState(productId: string, product: Product): void {
        this.productMap.set(productId, product);
    }

    fetchProductById(productId: string): Observable<Product> {
        const getProductByIdUrl = `${this.apiUrl}/products/${productId}`;
        return this.http.get<Product>(getProductByIdUrl);
    }
}
