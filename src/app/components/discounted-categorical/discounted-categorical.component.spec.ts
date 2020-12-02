import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedCategoricalComponent } from './discounted-categorical.component';

describe('DiscountedCategoricalComponent', () => {
  let component: DiscountedCategoricalComponent;
  let fixture: ComponentFixture<DiscountedCategoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountedCategoricalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountedCategoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
