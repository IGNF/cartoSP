import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeocodageService {

  private apiUrl = 'https://data.geopf.fr/geocodage/search';

  constructor(private http: HttpClient) {}

  // Geometry
  getSearchTrueGeometry(query: string): Observable<any> {
    return this.http.get(this.apiUrl,{
      params:{
        q: query,
        index: "poi",
        limit: 1,
        returntruegeometry: true
      }
    });
  }
}
