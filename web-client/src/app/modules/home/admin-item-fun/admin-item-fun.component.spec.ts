import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemFunComponent } from './admin-item-fun.component';

describe('AdminItemFunComponent', () => {
  let component: AdminItemFunComponent;
  let fixture: ComponentFixture<AdminItemFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
