import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBasicComponent } from './page-basic.component';

describe('PageBasicComponent', () => {
  let component: PageBasicComponent;
  let fixture: ComponentFixture<PageBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
