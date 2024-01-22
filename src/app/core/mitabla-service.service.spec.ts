import { TestBed } from '@angular/core/testing';

import { MitablaServiceService } from './mitabla-service.service';

describe('MitablaServiceService', () => {
  let service: MitablaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitablaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
