import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';

interface ProductOption {
  key: string;
  value: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  @Input() product: Product | undefined;
  productName: string | undefined;
  productOptions: ProductOption[] = [];
  newestPrice: number | undefined = 0;

  ngOnInit(): void {
    console.log('Product data - product-detail:', this.product)
    if (this.product) {
      this.productName = this.product.productName;
      console.log('Product Name:', this.productName);
      this.extractOptions();
      this.extractNewestPrice();
    }
  }

  private extractOptions(): void {
    const options = this.product?.options || {};

    // map all key and value in from product's options response
    this.productOptions = Object.entries(options).map(([key, value]) => ({
      key,
      value
    }));
  }

  private extractNewestPrice(): void {
    const priceHistory = this.product?.priceHistory || [];

    console.log('Price History:', priceHistory);
    
    if (priceHistory.length > 0) {
      // reduce iterates over each element of array, applying a specified callback function
      const mostRecentPrice = priceHistory.reduce((latest, price) => {

        /*
          Callback function executed on each ele of priceHistory[] during reduce operation.
          It compares the UpdatedDate of each 'price' object with the UpdatedDate of the 'latest' object.
          This effectively find the object with the maximum UpdatedDate.
        */
        return price.UpdatedDate > latest.UpdatedDate ? price : latest;
      }, priceHistory[0]);

      this.newestPrice = mostRecentPrice.Price / 100; // Convert to dollars
    }
  }
}
