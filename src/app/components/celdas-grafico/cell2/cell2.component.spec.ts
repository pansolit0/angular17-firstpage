import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell2ComponentO } from './cell2.component';

describe('Cell2Component', () => {
  let component: Cell2ComponentO;
  let fixture: ComponentFixture<Cell2ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell2ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell2ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
