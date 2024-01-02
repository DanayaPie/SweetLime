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
  productWebDomain: string | undefined;

  ngOnInit(): void {
    console.log('Product-detail - ngOnInit', this.product)
    if (this.product) {

      this.productName = this.product.productName;
      console.log('Product-detail - productName:', this.productName);

      this.productImage = this.product.imagePath;
      console.log('Product-detail - imagePath', this.productImage);

      this.productWebDomain = this.product.webdomain;
    }
  }


  onOpenProductWebsite(): void {
    
    if (this.product && this.product.productUrl) {
      window.open(this.product.productUrl, '_blank');
    }
  }
}

