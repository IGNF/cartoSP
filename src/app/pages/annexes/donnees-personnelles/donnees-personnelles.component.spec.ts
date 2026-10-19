import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesPersonnellesComponent } from './donnees-personnelles.component';

describe('DonneesPersonnellesComponent', () => {
  let component: DonneesPersonnellesComponent;
  let fixture: ComponentFixture<DonneesPersonnellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonneesPersonnellesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneesPersonnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
