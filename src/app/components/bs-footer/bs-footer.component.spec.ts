import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsFooterComponent } from './bs-footer.component';

describe('BsFooterComponent', () => {
  let component: BsFooterComponent;
  let fixture: ComponentFixture<BsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
