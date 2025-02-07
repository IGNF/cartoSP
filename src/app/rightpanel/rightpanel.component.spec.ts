import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightpanelComponent } from './rightpanel.component';

describe('RightpanelComponent', () => {
  let component: RightpanelComponent;
  let fixture: ComponentFixture<RightpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
