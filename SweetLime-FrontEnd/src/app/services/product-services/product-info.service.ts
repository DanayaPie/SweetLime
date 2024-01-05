import { Injectable } from '@angular/core';

import { Product } from 'src/app/models/product';
import { SupportedWebsiteCheckService } from '../supported-website-check.service';

@Injectable({
    providedIn: 'root'
})

export class ProductInfoService {

    constructor(
        private supportedWebsiteCheckService: SupportedWebsiteCheckService
    ) {}

    mapToProductModel(productData: any): Product {
        return {
            productId: productData.productId,
            productName: productData.productName,
            productUrl: productData.productUrl,
            createdDate: new Date(this.convertEpochToLocalDate(productData.createdDate)),
            deletedDate: new Date(this.convertEpochToLocalDate(productData.deletedDate)),
            imagePath: productData.imagePath,
            options: this.extractOptions(productData.options),
            priceHistory: this.convertPriceHistory(productData.priceHistory),
            newestPrice: this.extractNewestPrice(productData.priceHistory),
            webdomain: this.extractAndFormatWebDomain(productData.productUrl)
        }
    }

    private convertEpochToLocalDate(epoch: number): string {
        console.log("convertEpochToLocalDate");

        return epoch ? new Date(epoch * 1000).toLocaleDateString() : '';
    }

    private extractOptions(optionsData: any): { [key: string]: string; } {
        console.log("extractOptions");

        // map all key and value from options
        return Object.entries(optionsData).reduce((result: { [key: string]: string}, [key, value]) => {
            result[key] = String(value);
            return result;
        }, {});
    }

    private convertPriceHistory(priceHistoryData: any[]): any[] {
        console.log("convertPriceHistory");

        return priceHistoryData.map((priceData) => {
            return {
                Price: priceData.Price / 100,
                UpdatedDate: new Date(this.convertEpochToLocalDate(priceData.UpdatedDate)),
            };
        });
    }

    private extractNewestPrice(priceHistoryData: any[]): number {
        console.log("extractNewestPrice");

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

    private extractAndFormatWebDomain(url: string): string {
        const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im);
        const domain = match ? match[1] : '';

        // return capitalized first letter
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    }
}
