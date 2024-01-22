import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cell4ComponentO } from './cell4.component';

describe('Cell4Component', () => {
  let component: Cell4ComponentO;
  let fixture: ComponentFixture<Cell4ComponentO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cell4ComponentO]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cell4ComponentO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
