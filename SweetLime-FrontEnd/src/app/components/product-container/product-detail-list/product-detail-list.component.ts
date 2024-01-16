import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.scss']
})

export class ProductDetailListComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor() {}
  
  ngOnInit(): void {
  }
}
