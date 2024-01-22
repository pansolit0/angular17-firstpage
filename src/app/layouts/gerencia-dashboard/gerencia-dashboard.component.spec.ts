import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaDashboardComponent } from './gerencia-dashboard.component';

describe('GerenciaDashboardComponent', () => {
  let component: GerenciaDashboardComponent;
  let fixture: ComponentFixture<GerenciaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciaDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
