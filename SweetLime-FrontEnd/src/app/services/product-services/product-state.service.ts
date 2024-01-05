import { Injectable } from "@angular/core";

import { Product } from "src/app/models/product";

@Injectable({
    providedIn: 'root'
})

export class ProductStateService {

    // defined productMap as Map
    private productMap: Map<string, Product> = new Map<string, Product>();

    getProductFromStateByUrl(productUrl: string): Product[] {
        const products: Product[] = [];

        for (const product of this.productMap.values()) {
            if (product.productUrl === productUrl) {
                products.push(product);
            }
        }

        return products;
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

}