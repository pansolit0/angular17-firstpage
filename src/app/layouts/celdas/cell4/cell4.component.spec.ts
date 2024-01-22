import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell4Component } from './cell4.component';

describe('Cell4Component', () => {
  let component: Cell4Component;
  let fixture: ComponentFixture<Cell4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
