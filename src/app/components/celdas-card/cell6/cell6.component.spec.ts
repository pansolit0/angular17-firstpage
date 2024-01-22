import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell6Componentc6 } from './cell6.component';

describe('Cell6Component', () => {
  let component: Cell6Componentc6;
  let fixture: ComponentFixture<Cell6Componentc6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell6Componentc6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cell6Componentc6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
