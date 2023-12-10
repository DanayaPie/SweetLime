import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchForm: FormGroup = this.formBuilder.group({
    productUrl: ['']
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) {}

  onSubmit() {
    const productUrl = this.searchForm.value.productUrl;

    this.productService.getProductByUrl(productUrl).subscribe(
      (data) => {
        console.log('Produce Retrieved:', data);
      },
      (error) => {
        console.error('Error getting product:', error);
      }
    )

    // this.router.navigate(['/product']);
  }
}
