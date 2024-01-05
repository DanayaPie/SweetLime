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
        console.debug("mapToProductModel");

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
        console.debug("convertEpochToLocalDate");

        return epoch ? new Date(epoch * 1000).toLocaleDateString() : '';
    }

    private extractOptions(optionsData: any): { [key: string]: string; } {
        console.debug("extractOptions");

        // map all key and value from options
        return Object.entries(optionsData).reduce((result: { [key: string]: string}, [key, value]) => {
            result[key] = String(value);
            return result;
        }, {});
    }

    private convertPriceHistory(priceHistoryData: any[]): any[] {
        console.debug("convertPriceHistory");

        return priceHistoryData.map((priceData) => {
            return {
                Price: priceData.Price / 100,
                UpdatedDate: new Date(this.convertEpochToLocalDate(priceData.UpdatedDate)),
            };
        });
    }

    private extractNewestPrice(priceHistoryData: any[]): number {
        console.debug("extractNewestPrice");

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
        console.debug("extractAndFormatWebDomain");

        const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im);
        const domain = match ? match[1] : '';
        const topLvlDomain = domain.toLowerCase().split('.')[0];
        const titleCaseDomain = topLvlDomain.charAt(0).toUpperCase() + topLvlDomain.slice(1);

        return titleCaseDomain;
    }
}
