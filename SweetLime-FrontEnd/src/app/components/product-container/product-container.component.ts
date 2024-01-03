import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  // template: '<router-outlet></router-outlet>',
  styleUrls: ['./product-container.component.scss']
})

export class ProductContainerComponent implements OnInit {
  products: Product[] = [];

  constructor(
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log('ProductContainerComponent ngOnInit');
    this.sharedService.currentProduct.subscribe(data => {
      console.log('Product-container - data', data)

      if (Array.isArray(data) && data.length === 1) {
        this.products = data;
        this.sharedService.showProductInfo = true;
        this.sharedService.showProductList = false;
        console.log('Product-container - single product', this.products);
        
      } else if (Array.isArray(data) && data.length > 1) {
        this.products = data;
        this.sharedService.showProductInfo = false;
        this.sharedService.showProductList = true;
        console.log('Product-container - 2+ products', this.products);
      }
    }) 
  }
}
