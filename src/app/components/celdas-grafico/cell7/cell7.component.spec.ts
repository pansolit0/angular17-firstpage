import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell7ComponentO } from './cell7.component';

describe('Cell7Component', () => {
  let component: Cell7ComponentO;
  let fixture: ComponentFixture<Cell7ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell7ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell7ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
