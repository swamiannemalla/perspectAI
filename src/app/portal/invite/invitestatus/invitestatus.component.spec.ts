import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitestatusComponent } from './invitestatus.component';

describe('InvitestatusComponent', () => {
  let component: InvitestatusComponent;
  let fixture: ComponentFixture<InvitestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
