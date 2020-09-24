import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAssessmetsUsersComponent } from './custom-assessmets-users.component';

describe('CustomAssessmetsUsersComponent', () => {
  let component: CustomAssessmetsUsersComponent;
  let fixture: ComponentFixture<CustomAssessmetsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAssessmetsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAssessmetsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
