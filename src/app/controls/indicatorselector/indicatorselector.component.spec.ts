import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorselectorComponent } from './indicatorselector.component';

describe('IndicatorselectorComponent', () => {
  let component: IndicatorselectorComponent;
  let fixture: ComponentFixture<IndicatorselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorselectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicatorselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
