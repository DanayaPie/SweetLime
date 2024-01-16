import { Component, Input } from '@angular/core';

import { Product } from 'src/app/models/product';

interface ProductOption {
  key: string;
  value: string;
}

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss']
})

export class DetailListComponent {
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
