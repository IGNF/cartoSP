import { TestBed } from '@angular/core/testing';

import { WfsService } from './wfs.service';

describe('WfsService', () => {
  let service: WfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
