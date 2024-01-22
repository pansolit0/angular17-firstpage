import { TestBed } from '@angular/core/testing';

import { CeldaStateService } from './celda-state.service';

describe('CeldaStateService', () => {
  let service: CeldaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeldaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
