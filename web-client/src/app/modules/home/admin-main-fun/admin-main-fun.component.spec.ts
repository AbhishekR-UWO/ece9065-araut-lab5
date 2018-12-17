import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainFunComponent } from './admin-main-fun.component';

describe('AdminMainFunComponent', () => {
  let component: AdminMainFunComponent;
  let fixture: ComponentFixture<AdminMainFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
