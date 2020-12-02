import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoricalComponent } from './categorical.component';

describe('CategoricalComponent', () => {
  let component: CategoricalComponent;
  let fixture: ComponentFixture<CategoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoricalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
