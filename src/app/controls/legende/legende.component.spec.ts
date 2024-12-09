import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendeComponent } from './legende.component';

describe('LegendeComponent', () => {
  let component: LegendeComponent;
  let fixture: ComponentFixture<LegendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
