import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ProductService } from '../../services/product.service';
import { SharedService } from '../../services/shared.service';
import { SupportedWebComponent } from '../supported-web/supported-web.component';
import { SupportedWebsiteCheckService } from '../../services/supported-website-check.service';

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
  
          this.productService.fetchProductByUrl(productUrl).subscribe(
            (data) => {
              console.log('Header - Product Retrieved', data);
      
              this.product = data;
              console.log('Header - Product data', this.product);
      
              this.sharedService.onSearchProduct(this.product);
      
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
          // unsupported website errors
          console.log("Header - unsupported website error");
  
          this.sharedService.showSupportedWebError = true;
          this.sharedService.showProductContainer = false;
          this.sharedService.onSearchProduct(null);
          this.searchForm.reset();
  
          this.sharedService.supportedWebErrorMessage = 
          "The product entered is not from our supported website. Please enter a product URL from our list of supported websites.";
        }

      } else {
        // invalid productUrl error 
        console.log("Header - invalid productUrl error");

        this.sharedService.showSupportedWebError = true;
        this.sharedService.showProductContainer = false;
        this.sharedService.onSearchProduct(null);
        this.searchForm.reset();

        this.sharedService.supportedWebErrorMessage =
          "Please enter a valid product URL. The product URL must be from our supported websites.";
      }
      

    } else {
      // form validation errors
      console.log("Header - form validation errors");

      this.sharedService.showSupportedWebError = true;
      this.sharedService.showProductContainer = false;
      this.sharedService.onSearchProduct(null);
      this.searchForm.reset();

      this.sharedService.supportedWebErrorMessage =
        "Please enter a valid product URL. The product URL must be from our supported websites.";
    }
  }

  private isValidUrl(url: string): boolean {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }
}
