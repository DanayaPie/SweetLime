import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailListComponent } from './product-detail-list.component';

describe('ProductDetailListComponent', () => {
  let component: ProductDetailListComponent;
  let fixture: ComponentFixture<ProductDetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailListComponent]
    });
    fixture = TestBed.createComponent(ProductDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
