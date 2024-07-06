import { Component } from '@angular/core';

import { Product } from '../models/product';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})

export class ProductContainerComponent {
  selectedProduct: Product | null = null;
  displayProductList = true;

  constructor(
    private sharedService: SharedService
  ) {}

  onProductSelected(product: Product): void {
    this.selectedProduct = product;
    this.sharedService.showProductComponent = true;
    this.displayProductList = false;
  }

  onBackToList(): void {
    this.selectedProduct = null;
    this.displayProductList = true;
  }
}
