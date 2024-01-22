import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorDashboardComponent } from './operador-dashboard.component';

describe('OperadorDashboardComponent', () => {
  let component: OperadorDashboardComponent;
  let fixture: ComponentFixture<OperadorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadorDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
