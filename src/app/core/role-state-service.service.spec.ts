import { TestBed } from '@angular/core/testing';

import { RoleStateServiceService } from './role-state-service.service';

describe('RoleStateServiceService', () => {
  let service: RoleStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
