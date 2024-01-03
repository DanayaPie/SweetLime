import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit{
  @Input() product: Product | undefined;

  productDetail: Product | undefined;
  productId: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('ProductComponent ngOnInit');

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {

        // check if productDetail is already available in the client-side state
        if (this.productService.hasProduct(this.productId)) {
          // product detail already available
          this.productDetail = this.productService.getProductFromStateById(this.productId);

        } else {
          // product details not available, fetch from teh backend

        }
      }
    })

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.fetchProductById(this.productId).subscribe((product: Product) => {
        });
      }
    })
  }
}
