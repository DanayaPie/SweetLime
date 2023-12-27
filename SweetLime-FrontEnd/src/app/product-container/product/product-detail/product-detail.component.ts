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
  productImage: string | null | undefined;
  productOptions: ProductOption[] = [];
  newestPrice: number | undefined = 0;
  productWebsite: string | undefined;

  ngOnInit(): void {
    console.log('Product-detail - ngOnInit', this.product)
    if (this.product) {

      this.productName = this.product.productName;
      console.log('Product-detail - productName:', this.productName);

      this.productImage = this.product.imagePath;
      console.log('Product-detail - imagePath', this.productImage);

      this.extractOptions();
      this.extractNewestPrice();
      this.extractWebDomain();
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

    console.log('Product-detail -  priceHistory:', priceHistory);
    
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

  private extractWebDomain(): void {
    const url = new URL(this.product?.productUrl ?? "");
    const domainParts = url.hostname.split('.');

    // Exclude the first part if it's 'www' and get the second part (main domain)
    this.productWebsite = domainParts.length > 1 && domainParts[0].toLowerCase() === 'www'
      // regex matches first word character in the string and replace it with uppercase
      ? domainParts[1].replace(/^\w/, match => match.toUpperCase())
      : domainParts[0].replace(/^\w/, match => match.toUpperCase());
  }

  onOpenProductWebsite(): void {
    
    if (this.product && this.product.productUrl) {
      window.open(this.product.productUrl, '_blank');
    }
  }
}

