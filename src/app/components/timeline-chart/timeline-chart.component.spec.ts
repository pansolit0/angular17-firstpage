import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineChartComponent } from './timeline-chart.component';

describe('TimelineChartComponent', () => {
  let component: TimelineChartComponent;
  let fixture: ComponentFixture<TimelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
