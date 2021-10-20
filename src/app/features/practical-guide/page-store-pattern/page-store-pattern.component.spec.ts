import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStorePatternComponent } from './page-store-pattern.component';

describe('PageStorePatternComponent', () => {
  let component: PageStorePatternComponent;
  let fixture: ComponentFixture<PageStorePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStorePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStorePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
