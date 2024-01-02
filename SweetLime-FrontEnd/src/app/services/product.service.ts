import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { ConfigService } from './config.service';
import { Product } from '../models/product';
import { oneProductHardCoded } from './hardcoded/one-product-hardcoded';
import { twoProductHardCoded } from './hardcoded/two-product-hardcoded';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl: string;

    constructor (
        private configService: ConfigService, 
        private http: HttpClient
    ) {
        this.apiUrl = this.configService.getApiUrl();
    }

    /* 
        hardcoded products 
    */ 
    fetchProductByUrl(productUrl: string): Observable<Product[]> {
        console.log("Product Service - ProductUrl:", productUrl);
    
        // For testing purposes, return hardcoded data based on the provided productUrl
        if (productUrl.toLowerCase().includes('numbuz-n')) {

            console.log("Product Service - Using oneProductHardCoded");
            return of(oneProductHardCoded);

        } else if (productUrl.toLowerCase().includes('beauty-of-joseon')) {
            console.log("Product Service - Using twoProductHardCoded");
            return of(twoProductHardCoded);
        }
    
        // If you want to use the backend API, uncomment the following lines
        // const requestBody = { productUrl };
        // const getProductByUrl = `${this.apiUrl}/productUrl`;
    
        // return this.http.post<Product[]>(getProductByUrl, requestBody);
    
        // For simplicity, return an empty array if no hardcoded data or backend request is available
        console.log("No matching condition, using backend logic");
        return of([]);
    }

    /*
        fetch product from database
    */
    // fetchProductByUrl(productUrl: string): Observable<Product[]> {
    //     const requestBody = { productUrl };
    //     const getProductByUrl = `${this.apiUrl}/productUrl`;

    //     return this.http.post<Product>(getProductByUrl, requestBody).pipe(
    //         map((data: any) => {
    //             if (data && Array.isArray(data)) {
    //                 return data.map((productData: any) => {

    //                     // map productData to Product model
    //                     const product: Product = {
    //                         productId: productData.productId,
    //                         productName: productData.productName,
    //                         productUrl: productData.productUrl,
    //                         createdDate: new Date(this.convertEpochToLocalDate(productData.createdDate)),
    //                         deletedDate: new Date(this.convertEpochToLocalDate(productData.deleteDate)),
    //                         imagePath: productData.imagePath,
    //                         options: this.extractOptions(productData.options),
    //                         priceHistory: this.convertPriceHistory(productData.priceHistory),
    //                         newestPrice: this.extractNewestPrice(productData.priceHistory),
    //                         webdomain: this.extractWebdomain(productData.productUrl)
    //                     };
    
    //                     return product;
    //                 });
    //             } else {
    //                 console.error('Invalid response format:', data);
    //                 return [];
    //             }
    //         })
    //     );
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

    getProductById(productId: string): Observable<Product> {
        const getProductByIdUrl = `${this.apiUrl}/products/${productId}`;
        return this.http.get<Product>(getProductByIdUrl);
    }
}
