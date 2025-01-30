import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpwfsfilterComponent } from './spwfsfilter.component';

describe('SpwfsfilterComponent', () => {
  let component: SpwfsfilterComponent;
  let fixture: ComponentFixture<SpwfsfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpwfsfilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpwfsfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
