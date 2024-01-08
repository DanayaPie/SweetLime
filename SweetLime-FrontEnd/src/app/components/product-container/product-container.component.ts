import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';
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
    private route: ActivatedRoute,
    private fetchProductService: FetchProductService,
    public sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    console.log('ProductContainerComponent ngOnInit');

    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log('ProductContainerComponent - productId', productId);

      if (productId) {
        this.fetchProductService.fetchProductById(productId).subscribe(
          (product: Product) => {
            this.products = [product];
            console.log('ProductContainerComponent - fetched product from backend', this.products);
            
            this.handleProductData();
          },
          (error) => {
            console.error('ProductContainerComponent - Error fetching product:', error);          
          }
        )
      }
    })
  }

  handleProductData() {
    this.sharedService.currentProduct.subscribe(data => {
      console.log('Product-container - data', data)

      if (this.products.length === 1) {
        this.sharedService.showProductInfo = true;
        this.sharedService.showProductList = false;
        console.log('Product-container - single product', this.products);
      } else if (this.products.length > 1) {
        this.sharedService.showProductInfo = false;
        this.sharedService.showProductList = true;
        console.log('Product-container - 2+ products', this.products);
      }
    })
  }
}
