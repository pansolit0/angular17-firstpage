import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SidebarOpComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarOpComponent;
  let fixture: ComponentFixture<SidebarOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarOpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
