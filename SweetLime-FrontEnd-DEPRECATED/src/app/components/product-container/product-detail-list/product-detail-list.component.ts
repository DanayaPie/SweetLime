import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.scss']
})

export class ProductDetailListComponent implements OnChanges {
  @Input() products: Product[] = [];
  
  constructor(
    private route: ActivatedRoute,
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ProductDetailListComponent - ngOnChanges:', changes);
  }
}
