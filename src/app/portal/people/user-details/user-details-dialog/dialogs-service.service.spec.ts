import { TestBed } from '@angular/core/testing';

import { DialogsServiceService } from './dialogs-service.service';

describe('DialogsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogsServiceService = TestBed.get(DialogsServiceService);
    expect(service).toBeTruthy();
  });
});
