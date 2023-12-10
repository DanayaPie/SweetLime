import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchForm: FormGroup = this.formBuilder.group({
    productUrl: ['']
  });

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private productService: ProductService,
    private sharedService: SharedService
  ) {}

  onSubmit() {
    const productUrl = this.searchForm.value.productUrl;

    this.productService.getProductByUrlRequest(productUrl).subscribe(
      (data) => {
        console.log('Produce Retrieved:', data);

        this.sharedService.showProductComponent = true;
      },
      (error) => {
        console.error('Error getting product:', error);
        
        this.sharedService.showProductComponent = false;
      }
    )

    // this.router.navigate(['/product']);
  }
}
