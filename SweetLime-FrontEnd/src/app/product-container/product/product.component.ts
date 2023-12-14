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
  products: any[] = [];

  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentProduct.subscribe(data => {
      if (data instanceof Array) {
        this.products = data;
        console.log('Product - product array', this.products);
      } else if (data instanceof Object){
        this.products = [data];
        console.log('Product - product not array', this.products);
      }
    })
  }
}
