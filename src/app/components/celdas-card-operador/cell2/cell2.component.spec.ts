import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell2Component2o } from '../../celdas-card-operador/cell2/cell2.component';

describe('Cell2Component', () => {
  let component: Cell2Component2o;
  let fixture: ComponentFixture<Cell2Component2o>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell2Component2o]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell2Component2o);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
