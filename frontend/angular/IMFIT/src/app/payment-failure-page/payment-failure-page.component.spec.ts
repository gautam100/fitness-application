import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailurePageComponent } from './payment-failure-page.component';

describe('PaymentFailurePageComponent', () => {
  let component: PaymentFailurePageComponent;
  let fixture: ComponentFixture<PaymentFailurePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFailurePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFailurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
