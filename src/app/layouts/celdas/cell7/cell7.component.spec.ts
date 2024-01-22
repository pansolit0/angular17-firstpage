import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell7Component } from './cell7.component';

describe('Cell7Component', () => {
  let component: Cell7Component;
  let fixture: ComponentFixture<Cell7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
