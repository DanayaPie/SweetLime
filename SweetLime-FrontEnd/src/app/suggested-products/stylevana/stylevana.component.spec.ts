import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylevanaComponent } from './stylevana.component';

describe('StylevanaComponent', () => {
  let component: StylevanaComponent;
  let fixture: ComponentFixture<StylevanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StylevanaComponent]
    });
    fixture = TestBed.createComponent(StylevanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
