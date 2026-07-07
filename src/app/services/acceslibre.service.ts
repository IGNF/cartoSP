import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceslibreService {

    public apiUrl = 'https://acceslibre.beta.gouv.fr/api/erps/';

    constructor(private http: HttpClient) {}

    // Get commune infos
    getAccessibilityLink(query: string): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: 'Api-Key f7X5MksR.oYrOleFQk2cxJZDuHpX4mLF1fBNPpm1Y'
      });

      return this.http.get(this.apiUrl + "?asp_id=" + query, { headers });
    }

}
