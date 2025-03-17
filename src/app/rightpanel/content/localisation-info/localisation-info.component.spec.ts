import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationInfoComponent } from './localisation-info.component';

describe('LocalisationInfoComponent', () => {
  let component: LocalisationInfoComponent;
  let fixture: ComponentFixture<LocalisationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalisationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalisationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
