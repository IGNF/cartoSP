import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetfeatureinfoComponent } from './getfeatureinfo.component';

describe('GetfeatureinfoComponent', () => {
  let component: GetfeatureinfoComponent;
  let fixture: ComponentFixture<GetfeatureinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetfeatureinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetfeatureinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
