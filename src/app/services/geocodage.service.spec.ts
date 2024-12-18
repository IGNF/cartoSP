import { TestBed } from '@angular/core/testing';

import { GeocodageService } from './geocodage.service';

describe('GeocodageService', () => {
  let service: GeocodageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
