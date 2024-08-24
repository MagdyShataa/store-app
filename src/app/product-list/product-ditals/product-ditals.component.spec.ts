import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDitalsComponent } from './product-ditals.component';

describe('ProductDitalsComponent', () => {
  let component: ProductDitalsComponent;
  let fixture: ComponentFixture<ProductDitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDitalsComponent]
    });
    fixture = TestBed.createComponent(ProductDitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
