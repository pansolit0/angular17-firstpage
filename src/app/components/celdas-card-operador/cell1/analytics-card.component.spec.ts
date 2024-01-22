import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell1Component1o } from '../../celdas-card-operador/cell1/analytics-card.component';

describe('AnalyticsCardComponent', () => {
  let component: Cell1Component1o;
  let fixture: ComponentFixture<Cell1Component1o>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell1Component1o]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell1Component1o);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
