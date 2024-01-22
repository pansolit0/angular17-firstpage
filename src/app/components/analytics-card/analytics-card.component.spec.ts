import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCardComponent } from './analytics-card.component';

describe('AnalyticsCardComponent', () => {
  let component: AnalyticsCardComponent;
  let fixture: ComponentFixture<AnalyticsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
