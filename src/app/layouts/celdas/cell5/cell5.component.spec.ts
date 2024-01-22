import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell5Component } from './cell5.component';

describe('Cell5Component', () => {
  let component: Cell5Component;
  let fixture: ComponentFixture<Cell5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
