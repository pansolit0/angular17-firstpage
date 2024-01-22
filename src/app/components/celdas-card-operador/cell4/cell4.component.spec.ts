import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell4Componentc4 } from '../../celdas-card-operador/cell4/cell4.component';

describe('Cell4Component', () => {
  let component: Cell4Componentc4;
  let fixture: ComponentFixture<Cell4Componentc4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell4Componentc4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell4Componentc4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
