import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetaillsComponent } from './personal-detaills.component';

describe('PersonalDetaillsComponent', () => {
  let component: PersonalDetaillsComponent;
  let fixture: ComponentFixture<PersonalDetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDetaillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
