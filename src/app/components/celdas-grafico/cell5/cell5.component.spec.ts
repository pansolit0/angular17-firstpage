import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell5ComponentO } from './cell5.component';

describe('Cell5Component', () => {
  let component: Cell5ComponentO;
  let fixture: ComponentFixture<Cell5ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell5ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell5ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
