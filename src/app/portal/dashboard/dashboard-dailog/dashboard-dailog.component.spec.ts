import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDailogComponent } from './dashboard-dailog.component';

describe('DashboardDailogComponent', () => {
  let component: DashboardDailogComponent;
  let fixture: ComponentFixture<DashboardDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
