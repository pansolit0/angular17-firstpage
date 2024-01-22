import { TestBed } from '@angular/core/testing';

import { DataPieChartService } from './data-pie-chart.service';

describe('DataPieChartService', () => {
  let service: DataPieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
