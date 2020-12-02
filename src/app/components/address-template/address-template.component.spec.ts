import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTemplateComponent } from './address-template.component';

describe('AddressTemplateComponent', () => {
  let component: AddressTemplateComponent;
  let fixture: ComponentFixture<AddressTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
