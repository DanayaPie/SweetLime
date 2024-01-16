import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';
import { ProductStateService } from 'src/app/services/product-services/product-state.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit{
  @Input() products: Product[] = [];

  constructor (
    private route: ActivatedRoute,
    private fetchProductService: FetchProductService
  ) {}

  ngOnInit(): void {
    console.log('ProductComponent ngOnInit');
    this.handleProductData();
  }

  private handleProductData(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        this.fetchProductService.fetchProductById(productId).subscribe(
          (product: Product) => {
            this.products = [product];
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }
}