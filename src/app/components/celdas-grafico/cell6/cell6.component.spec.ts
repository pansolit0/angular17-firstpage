import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell6ComponentO } from './cell6.component';

describe('Cell6Component', () => {
  let component: Cell6ComponentO;
  let fixture: ComponentFixture<Cell6ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell6ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell6ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
