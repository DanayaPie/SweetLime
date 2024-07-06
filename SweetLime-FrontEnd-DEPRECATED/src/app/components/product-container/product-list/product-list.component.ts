import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../models/product';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit{
  @Input() products: Product[] = [];
  @Output() productSelected: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.sharedService.currentProductList.subscribe(products => {
      if (products !== null) {
        this.products = products;
        console.log('Product data - product list component', this.products);      
      }
    });
  }

  onProductSelected(product: Product): void {
    console.log('Selected product:', product);
    this.productSelected.emit(product);
    this.router.navigate(['/product', product.productId]);
  }
}
