import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionDesDonneesComponent } from './correction-des-donnees.component';

describe('CorrectionDesDonneesComponent', () => {
  let component: CorrectionDesDonneesComponent;
  let fixture: ComponentFixture<CorrectionDesDonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionDesDonneesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrectionDesDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
