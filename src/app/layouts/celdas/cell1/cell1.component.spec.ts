import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell1Component } from './cell1.component';

describe('Cell1Component', () => {
  let component: Cell1Component;
  let fixture: ComponentFixture<Cell1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
