import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell6Component } from './cell6.component';

describe('Cell6Component', () => {
  let component: Cell6Component;
  let fixture: ComponentFixture<Cell6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
