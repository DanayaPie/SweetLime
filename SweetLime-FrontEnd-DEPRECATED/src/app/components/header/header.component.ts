import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { SupportedWebsiteCheckService } from '../../services/supported-website-check.service';

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
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private supportedWebsiteCheckService: SupportedWebsiteCheckService
  ) {
    this.searchForm = this.formBuilder.group({
      productUrl: ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.log("HeaderComponent - onSubmit");

    if (this.searchForm.valid) {
      console.log("HeaderComponent - searchForm.valid");

      this.sharedService.resetSearchProductFrom();
      const productUrl = this.searchForm.value.productUrl.trim();

      // validate product url
      if (this.isValidUrl(productUrl)) {
        console.log("HeaderComponent - productUrl is valid");
        
        // validate product url is from supported website
        if (this.supportedWebsiteCheckService.isSupportedWebsite(productUrl)) {
          console.log("HeaderComponent - productUrl is supported", productUrl);

          const encodedUrl = encodeURIComponent(productUrl);

          this.sharedService.onSearchProduct(encodedUrl).subscribe(products => {
            if (products.length > 0) {
              this.router.navigate(['products', encodeURIComponent(encodedUrl)]);
              this.sharedService.showProductContainer = true;

            } else {
              this.handleUnsupportedProduct();
            }
          });

        } else {
          this.handleUnsupportedWebsite();
        }

      } else {
        this.handleInvalidUrl();
      }

    } else {
      this.handleInvalidForm();
    }

    this.searchForm.reset();
  }

  private isValidUrl(url: string): boolean {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  private handleUnsupportedProduct() {
    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);

    this.sharedService.supportedWebErrorMessage = "The product is not supported. Please try another product.";
    console.error('Product is not supported');
  }

  private handleUnsupportedWebsite() {
    console.debug("HeaderComponent - unsupported website error");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);

    this.sharedService.supportedWebErrorMessage = 
    "The product entered is not from our supported website. Please enter a product URL from our list of supported websites.";
  }

  private handleInvalidUrl() {
    console.debug("HeaderComponent - invalid productUrl error");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);

    this.sharedService.supportedWebErrorMessage =
      "Please enter a valid product URL. The product URL must be from our supported websites.";
  }

  private handleInvalidForm() {
    console.debug("HeaderComponent - form validation errors");

    this.sharedService.showSupportedWebError = true;
    this.sharedService.showProductContainer = false;
    this.sharedService.onSearchProduct(null);

    this.sharedService.supportedWebErrorMessage =
      "Please enter a valid product URL. The product URL must be from our supported websites.";
  }
}