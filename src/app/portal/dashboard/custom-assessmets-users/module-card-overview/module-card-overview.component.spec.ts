import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCardOverviewComponent } from './module-card-overview.component';

describe('ModuleCardOverviewComponent', () => {
  let component: ModuleCardOverviewComponent;
  let fixture: ComponentFixture<ModuleCardOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCardOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
