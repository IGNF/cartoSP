import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoireComponent } from './territoire.component';

describe('TerritoireComponent', () => {
  let component: TerritoireComponent;
  let fixture: ComponentFixture<TerritoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerritoireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerritoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
