import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeVersionsComponent } from './note-de-versions.component';

describe('NoteDeVersionsComponent', () => {
  let component: NoteDeVersionsComponent;
  let fixture: ComponentFixture<NoteDeVersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDeVersionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteDeVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
