import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell2Component2 } from '../cell2/cell2.component';

describe('Cell2Component', () => {
  let component: Cell2Component2;
  let fixture: ComponentFixture<Cell2Component2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell2Component2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell2Component2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
