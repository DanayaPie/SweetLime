import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { SupportedWebsiteCheckService } from '../../services/supported-website-check.service';
import { FetchProductService } from 'src/app/services/product-services/fetch-product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private fetchProductService: FetchProductService,
    private sharedService: SharedService,
    private supportedWebsiteCheckService: SupportedWebsiteCheckService
  ) {
    this.searchForm = this.formBuilder.group({
      productUrl: ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.log("Header - onSubmit");

    if (this.searchForm.valid) {
      console.log("Header - searchForm.valid");

      this.sharedService.resetSearchProductFrom();
      const productUrl = this.searchForm.value.productUrl.trim();

      // validate product url
      if (this.isValidUrl(productUrl)) {
        console.log("Header - productUrl is valid");
        
        // validate product url is from supported website
        if (this.supportedWebsiteCheckService.isSupportedWebsite(productUrl)) {
          console.log("Header - productUrl is supported");
  
          this.fetchProductService.fetchProductByUrl(productUrl).subscribe(
            (data) => {
              console.log('Header - Product Retrieved', data);

              this.sharedService.onSearchProduct(data);

              if (data.length === 1) {
                // Navigate to the 'product' route with the productId parameter
                this.router.navigate(['/product', data[0].productId]);
              } else if (data.length > 1) {
                // Navigate to the 'product-list' route when multiple products are retrieved
                this.router.navigate(['/product-list', productUrl]);
              } else {
                // Handle the case where no products are retrieved
              }

              this.sharedService.showProductContainer = true;
              this.sharedService.showSupportedWebError = false;
              this.searchForm.reset();
            },
            (error) => {
              console.error('Header - error getting product:', error);
      
              this.sharedService.showSupportedWebError = true;
              this.sharedService.showProductContainer = false;
              this.sharedService.onSearchProduct(null);
            }
          );
  
        } else {
          this.handleUnsupportedWebsite();
        }

      } else {
        this.handleInvalidUrl();
      }

    } else {
      this.handleInvalidForm();
    }
  }

  private isValidUrl(url: string): boolean {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }
  
  private handleUnsupportedWebsite() {
    console.debug("Header - unsupported website error");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);
    this.searchForm.reset();

    this.sharedService.supportedWebErrorMessage = 
    "The product entered is not from our supported website. Please enter a product URL from our list of supported websites.";
  }

  private handleInvalidUrl() {
    console.debug("Header - invalid productUrl error");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);
    this.searchForm.reset();

    this.sharedService.supportedWebErrorMessage =
      "Please enter a valid product URL. The product URL must be from our supported websites.";
  }

  private handleInvalidForm() {
    console.debug("Header - form validation errors");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);
    this.searchForm.reset();

    this.sharedService.supportedWebErrorMessage =
      "Please enter a valid product URL. The product URL must be from our supported websites.";
  }
}
