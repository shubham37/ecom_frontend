import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogColumnComponent } from './blog-column.component';

describe('BlogColumnComponent', () => {
  let component: BlogColumnComponent;
  let fixture: ComponentFixture<BlogColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
