import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell3ComponentO } from './cell3.component';

describe('Cell3Component', () => {
  let component: Cell3ComponentO;
  let fixture: ComponentFixture<Cell3ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell3ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell3ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
