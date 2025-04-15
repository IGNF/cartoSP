import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicartospService {

    private apiUrl = '/api';

    constructor(private http: HttpClient) {}

    // Get commune infos
    getCommuneInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/commune/" + query);
    }

    // Get departement infos
    getDepartementInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/departement/" + query);
    }

    // Get epci info
    getEpciInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/epci/" + query);
    }

    // Get SP type count
    getTypeCount(options: any): Observable<any> {
        return this.http.get(this.apiUrl + "/services_publics/count",{
            params: options
        });
    }
}
