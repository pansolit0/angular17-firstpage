import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell5Componentc5 } from './cell5.component';

describe('Cell5Component', () => {
  let component: Cell5Componentc5;
  let fixture: ComponentFixture<Cell5Componentc5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell5Componentc5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell5Componentc5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
