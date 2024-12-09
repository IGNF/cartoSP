import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsochroneSimpleComponent } from './isochrone-simple.component';

describe('IsochroneSimpleComponent', () => {
  let component: IsochroneSimpleComponent;
  let fixture: ComponentFixture<IsochroneSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsochroneSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsochroneSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
