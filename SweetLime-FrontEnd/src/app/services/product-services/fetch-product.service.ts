import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, throwError } from "rxjs";

import { ConfigService } from "../config.service";
import { Product } from "../../models/product";
import { ProductInfoService } from "./product-info.service";
import { ProductStateService } from "./product-state.service";
import { oneProductHardCodedOne } from "../hardcoded/one-product-hardcoded-one";
import { oneProductHardCodedTwo } from "../hardcoded/one-product-hardcoded-two";
import { multiProductHardcodedOne } from "../hardcoded/multi-productHardcoded-one";
import { multiProductHardcodedTwo } from "../hardcoded/multi-product-hardcoded-two";

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
    ) {
        this.apiUrl = this.configService.getApiUrl();
    }

    /* 
        Hardcoded Products 
        -- For development and testing purposes, return hardcoded data based on the provided productUrl
    */ 
    fetchProductByUrl(productUrl: string): Observable<Product[]> {
        console.log("FetchProductService - Hardcoded fetchProductByUrl:", productUrl);
    
        // Check if products are available in client-side state
        const cachedProducts = this.productStateService.getProductFromStateByUrl(productUrl);
    
        if (cachedProducts && cachedProducts.length > 0) {
            console.log("FetchProductService - using cached products from state");
            return of(cachedProducts);
        } else {
            console.log("FetchProductService - products not found in client state");
    
            let productObservable: Observable<Product[]>;
    
            if (productUrl.toLowerCase().includes('numbuz-n')) {
                console.log("FetchProductService - Using oneProductHardCodedOne");
                productObservable = of(oneProductHardCodedOne);

            } else if (productUrl.toLowerCase().includes('haruharu-wonder')) {
                console.log("FetchProductService - Using oneProductHardCodedTwo");
                productObservable = of(oneProductHardCodedTwo);

            } else if (productUrl.toLowerCase().includes('beauty-of-joseon')) {
                console.log("FetchProductService - Using multiProductHardcodedOne");
                productObservable = of(multiProductHardcodedOne);

            } else if (productUrl.toLowerCase().includes('etude-house')) {
                console.log("FetchProductService - Using multiProductHardcodedTwo");
                productObservable = of(multiProductHardcodedTwo);

            } else {
                console.error("No matching condition and products not found in client state");
                return throwError("Products not found"); // or handle the error as per your needs
            }
    
            // Save the fetched products to the client-side state
            productObservable.subscribe(products => {
                if (products.length > 0) {
                    products.forEach(product => {
                        this.productStateService.saveProductToState(product.productId, product);
                    });
                }
            });
    
            return productObservable;
        }
    }

    /*
        Fetch Product from Database by URL
    */
    // fetchProductByUrl(productUrl: string): Observable<Product[]> {
    //     console.log("FetchProductService - backend fetchProductByUrl:");

    //     // check if product are already available in client-side state
    //     const cachedProduct = this.productStateService.getProductFromStateByUrl(productUrl);

    //     if (cachedProduct && cachedProduct.length > 0) {
    //         return of (cachedProduct);
    //     } else {

    //         const requestBody = { productUrl };
    //         const getProductByUrl = `${this.apiUrl}/url`;
    //         console.log("requestBody:", requestBody);
    //         console.log("getProductByUrl:", getProductByUrl);


    //         // fetch product from backend
    //         return this.http.post<Product>(getProductByUrl, requestBody).pipe(
    //             map((data: any) => {
    //                 if (data && Array.isArray(data)) {
    //                     const products = data.map((productData: any) => {
    //                         const product = this.productInfoService.mapToProductModel(productData);

    //                         // save product to client-side state
    //                         this.productStateService.saveProductToState(product.productId, product);
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

    // /*
    //     Fetch Product from Database by Id
    // */
    fetchProductById(productId: string): Observable<Product> {
        console.log("FetchProductService - fetchProductById:");

        // Check if the product is already available in client-side state
        const cachedProduct = this.productStateService.getProductFromStateById(productId);
    
        if (cachedProduct) {
            // Return cached product
            return of(cachedProduct);
        } else {
            const requestBody = { productId };
            const getProductById = `${this.apiUrl}/id`;
    
            // fetch product from backend
            return this.http.post<Product>(getProductById, requestBody).pipe(
                map((productData: any) => {
                    if (productData) {
                        const product = this.productInfoService.mapToProductModel(productData);
        
                        // Save product to client-side state
                        this.productStateService.saveProductToState(product.productId, product);
                        return product;
    
                    } else {
                        console.error('Invalid response format:', productData);
                        throw new Error('Product not found');
                    }
                })
            );
        }
    }
}