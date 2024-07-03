import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Product } from 'src/app/models/product';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnInit {
  products$!: Observable<Product[]>;
  
  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
  ) {}

  ngOnInit() {
    console.log('ProductContainerComponent - ngOnInit()');

    // Use ActivatedRoute to get the URL parameter
    this.route.paramMap.pipe(
      switchMap(params => {
        const encodedProductUrl = params.get('url');
        console.log('ProductContainerComponent - Product URL:', encodedProductUrl);
        return this.sharedService.onSearchProduct(encodedProductUrl);
      })
    ).subscribe(products => {
    });
  }
}
