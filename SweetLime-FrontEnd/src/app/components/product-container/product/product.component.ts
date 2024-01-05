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
  @Input() product: Product | undefined;

  constructor (
    private route: ActivatedRoute,
    private productStateService: ProductStateService,
    private fetchProductService: FetchProductService
  ) {}

  ngOnInit(): void {
    console.log('ProductComponent ngOnInit');

    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
          this.fetchProductService.fetchProductById(productId).subscribe(
            (product: Product) => {
              this.product = product;
              console.log('ProductComponent - fetched product form backend')
            },
            (error) => {
              console.error('ProductComponent - Error fetching product:', error);
            }
          )
      }
    })   
  }
}