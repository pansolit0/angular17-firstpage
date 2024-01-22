import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell3Component } from './cell3.component';

describe('Cell3Component', () => {
  let component: Cell3Component;
  let fixture: ComponentFixture<Cell3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
