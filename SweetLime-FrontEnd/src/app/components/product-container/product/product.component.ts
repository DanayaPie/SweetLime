import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit{
  productId$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );

  constructor (
    private route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('ProductComponent ngOnInit');
    
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        // Try getting product from client-side state
        const cachedProduct = this.productService.getProductFromStateById(productId);

        if (cachedProduct) {
          // If product found
          this.productService.saveProductToState(productId, cachedProduct);
          console.log('ProductComponent - using cached product from client state')

        } else {
          // Fetch product form backend
          this.productService.fetchProductById(productId).subscribe(
            (product: Product) => {
              // Save fetched product to client-side state
              this.productService.saveProductToState(productId, product);
              console.log('ProductComponent - fetched product form backend')
            },
            (error) => {
              console.error('ProductComponent - Error fetching product:', error);
            }
          )
        }
      }
    })
  }
}
