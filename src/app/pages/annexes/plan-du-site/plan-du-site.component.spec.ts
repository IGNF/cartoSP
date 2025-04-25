import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDuSiteComponent } from './plan-du-site.component';

describe('PlanDuSiteComponent', () => {
  let component: PlanDuSiteComponent;
  let fixture: ComponentFixture<PlanDuSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDuSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDuSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
