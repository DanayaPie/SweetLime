import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})

export class ProductContainerComponent implements OnInit {
  products: Product[] = [];

  constructor(
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentProduct.subscribe(data => {
      console.log('Product-container - data', data)

      if (Array.isArray(data) && data.length === 1) {
        this.products = data;
        this.sharedService.showProductInfo = true;
        console.log('Product-container - single product', this.products);
        
      } else if (Array.isArray(data) && data.length > 1) {
        this.products = data;
        this.sharedService.showProductList = true;
        console.log('Product-container - 2+ products', this.products);
      }
    }) 
  }
}
