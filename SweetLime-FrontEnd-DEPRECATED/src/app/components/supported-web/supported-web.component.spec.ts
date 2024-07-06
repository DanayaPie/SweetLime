import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedWebComponent } from './supported-web.component';

describe('SupportedWebComponent', () => {
  let component: SupportedWebComponent;
  let fixture: ComponentFixture<SupportedWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportedWebComponent]
    });
    fixture = TestBed.createComponent(SupportedWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
