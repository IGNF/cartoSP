import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { GeocodageService } from './geocodage.service';

describe('GeocodageService', () => {
  let service: GeocodageService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GeocodageService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should escape apostrophes in AdminExpress CQL filters', () => {
    service.getAdminExpressGeometry("L'Haÿ-les-Roses", 'commune').subscribe();

    const request = httpTesting.expectOne(
      req => req.params.get('cql_filter') === "nom_officiel='L''Haÿ-les-Roses'"
    );
    request.flush({});
  });
});
