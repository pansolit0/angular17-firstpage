import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell3Componentc3 } from '../../celdas-card-operador/cell3/cell3.component';

describe('Cell3Component', () => {
  let component: Cell3Componentc3;
  let fixture: ComponentFixture<Cell3Componentc3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell3Componentc3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell3Componentc3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
