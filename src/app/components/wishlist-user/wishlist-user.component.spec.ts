import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistUserComponent } from './wishlist-user.component';

describe('WishlistUserComponent', () => {
  let component: WishlistUserComponent;
  let fixture: ComponentFixture<WishlistUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
