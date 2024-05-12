import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShippingOrderComponent } from './admin-shipping-order.component';

describe('AdminShippingOrderComponent', () => {
  let component: AdminShippingOrderComponent;
  let fixture: ComponentFixture<AdminShippingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShippingOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShippingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
