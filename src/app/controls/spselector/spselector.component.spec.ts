import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpselectorComponent } from './spselector.component';

describe('SpselectorComponent', () => {
  let component: SpselectorComponent;
  let fixture: ComponentFixture<SpselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpselectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
