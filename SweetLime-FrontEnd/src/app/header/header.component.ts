import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ProductService } from '../services/product.service';
import { SharedService } from '../services/shared.service';
import { supportedProductCheck } from '../validators/supportedProductCheck';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchForm: FormGroup;
  product: any;

  constructor(
    private formBuilder: FormBuilder, 
    private productService: ProductService,
    private sharedService: SharedService,
  ) {
    this.searchForm = this.formBuilder.group({
      productUrl: ['', [Validators.required, supportedProductCheck(this.sharedService)]]
    })
  }

  onSubmit() {
    const productUrl = this.searchForm.value.productUrl;

    this.productService.fetchProductByUrl(productUrl).subscribe(
      (data) => {
        console.log('Produce Retrieved:', data);
        this.product = data;
        console.log('Product data - header:', this.product)

        this.sharedService.changeProduct(this.product);

        this.sharedService.showProductComponent = true;
        this.sharedService.supportedProduct = false;

        this.searchForm.reset();
      },
      (error) => {
        console.error('Error getting product:', error);

        this.sharedService.supportedProduct = true;
        this.sharedService.showProductComponent = false;

        this.searchForm.reset();
      }

    )
  }
}
