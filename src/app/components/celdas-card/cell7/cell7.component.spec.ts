import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell7Componentc7 } from './cell7.component';

describe('Cell7Component', () => {
  let component: Cell7Componentc7;
  let fixture: ComponentFixture<Cell7Componentc7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell7Componentc7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell7Componentc7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
