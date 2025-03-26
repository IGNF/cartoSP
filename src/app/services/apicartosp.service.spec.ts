import { TestBed } from '@angular/core/testing';

import { ApicartospService } from './apicartosp.service';

describe('ApicartospService', () => {
  let service: ApicartospService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicartospService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
