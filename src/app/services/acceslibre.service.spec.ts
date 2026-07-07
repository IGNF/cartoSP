import { TestBed } from '@angular/core/testing';

import { AcceslibreService } from './acceslibre.service';

describe('AcceslibreService', () => {
  let service: AcceslibreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceslibreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
