import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap, throwError } from "rxjs";

import { ConfigService } from "../config.service";
import { Product } from "../../models/product";
import { ProductInfoService } from "./product-info.service";
import { ProductStateService } from "./product-state.service";
import { oneProductHardCodedOne } from "../hardcoded/one-product-hardcoded-one";
import { oneProductHardCodedTwo } from "../hardcoded/one-product-hardcoded-two";
import { multiProductHardcodedOne } from "../hardcoded/multi-productHardcoded-one";
import { multiProductHardcodedTwo } from "../hardcoded/multi-product-hardcoded-two";
import { SharedService } from "../shared.service";

@Injectable({
    providedIn: 'root'
})

export class FetchProductService {
    private apiUrl: string;

    constructor (
        private configService: ConfigService, 
        private http: HttpClient,
        private productInfoService: ProductInfoService,
        private productStateService: ProductStateService,
        private sharedService: SharedService,
    ) {
        this.apiUrl = this.configService.getApiUrl();
    }

    /* 
        Hardcoded Products 
        -- For development and testing purposes, return hardcoded data based on the provided productUrl
    */ 
    // fetchProductByUrl(productUrl: string): Observable<Product[]> {
    //     console.log("FetchProductService - Hardcoded fetchProductByUrl:", productUrl);
        
    //     const cachedProducts = this.productStateService.getProductFromStateByUrl(productUrl);
        
    //     if (cachedProducts && cachedProducts.length > 0) {
    //         console.log("FetchProductService - using cached products from state");
    //         return of(cachedProducts);

    //     } else {
    //         // Simulate fetching by URL with hardcoded products
    //         const products = this.getHardcodedProducts(productUrl);
      
    //         return of(products).pipe(
    //           map(data => {
    //             if (data && Array.isArray(data)) {
    //               return data.map(productData => {
    //                 const product = this.productInfoService.mapToProductModel(productData);
    //                 this.productStateService.saveProductToState(product.productId, product);
    //                 return product;
    //               });
    //             } else {
    //               console.error('Invalid response format:', data);
    //               return [];
    //             }
    //           })
    //         );
    //     }
    // }
      
    private getHardcodedProducts(productUrl: string): Product[] {
        if (productUrl.includes('etude-house')) {
            return multiProductHardcodedTwo;
        } else if (productUrl.includes('beauty-of-joseon')) {
            return multiProductHardcodedOne;
        } else if (productUrl.includes('numbuz')) {
            return oneProductHardCodedOne;
        } else if (productUrl.includes('haruharu-wonder')) {
            return oneProductHardCodedTwo;
        } else {
            console.error('Product URL not recognized:', productUrl);
            return [];
        }
    }

    /*
        Fetch Product from Database by URL
    */
    fetchProductByUrl(encodedProductUrl: string): Observable<Product[]> {
        console.log("FetchProductService - backend fetchProductByUrl:");

        // check if product are already available in client-side state
        const cachedProduct = this.productStateService.getProductFromStateByUrl(encodedProductUrl);

        if (cachedProduct && cachedProduct.length > 0) {
            return of (cachedProduct);
        } else {

            const productUrl = decodeURIComponent(encodedProductUrl);
            const requestBody = { productUrl };
            const getProductByUrl = `${this.apiUrl}/url`;
            console.log("FetchProductService - requestBody:", requestBody);
            console.log("FetchProductService - getProductByUrl:", getProductByUrl);

            // fetch product from backend
            return this.http.post<Product>(getProductByUrl, requestBody).pipe(
                map((data: any) => {
                    if (data && Array.isArray(data)) {
                        const products = data.map((productData: any) => {
                            const product = this.productInfoService.mapToProductModel(productData);

                            // save product to client-side state
                            this.productStateService.saveProductToState(product.productId, product);
                            return product;
                        });

                        return products;
                    } else {
                        console.error('Invalid response format:', data);
                        return [];
                    }
                })
            );
        }
    }

    /*
        Fetch Product from Database by Id
    */
    fetchProductById(productId: string): Observable<Product> {
        console.log("FetchProductService - fetchProductById:", productId);

        // Check if the product is already available in client-side state
        const cachedProduct = this.productStateService.getProductFromStateById(productId);
        console.log('FetchProductService - fetchProductById - cachedProduct', cachedProduct);
    
        if (cachedProduct) {
            // Return cached product
            console.log('FetchProductService - product found in client state by id')
            return of(cachedProduct);
        } else {
            const requestBody = { productId };
            const getProductById = `${this.apiUrl}/id`;

            console.log('FetchProductService - before HTTP request');
    
            // fetch product from backend
            return this.http.post<Product>(getProductById, requestBody).pipe(
                tap((product: Product) => {
                    console.log('FetchProductService - HTTP request success callback');
    
                    // Save product to client-side state
                    this.productStateService.saveProductToState(product.productId, product);
                })
            );
        }
    }
}