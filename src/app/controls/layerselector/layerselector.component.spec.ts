import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerselectorComponent } from './layerselector.component';

describe('LayerselectorComponent', () => {
  let component: LayerselectorComponent;
  let fixture: ComponentFixture<LayerselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerselectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayerselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
