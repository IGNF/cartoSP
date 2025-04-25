import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibiliteComponent } from './accessibilite.component';

describe('AccessibiliteComponent', () => {
  let component: AccessibiliteComponent;
  let fixture: ComponentFixture<AccessibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibiliteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
