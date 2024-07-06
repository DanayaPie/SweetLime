import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentProduct.subscribe(products => {
      if (products !== null) {
        this.products = [products];
        console.log('Product data - product component', this.products);
      }
    })
  }
}
