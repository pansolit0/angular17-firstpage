import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRolComponent } from './button-rol.component';

describe('ButtonRolComponent', () => {
  let component: ButtonRolComponent;
  let fixture: ComponentFixture<ButtonRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
