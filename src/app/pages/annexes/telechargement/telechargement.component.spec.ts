import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargementComponent } from './telechargement.component';

describe('TelechargementComponent', () => {
  let component: TelechargementComponent;
  let fixture: ComponentFixture<TelechargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelechargementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelechargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
