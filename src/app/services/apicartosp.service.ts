import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicartospService {

    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) {}

    // Get commune infos
    getCommuneInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/communes/" + query);
    }

    // Get departement infos
    getDepartementInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/departements/" + query);
    }

    // Get epci info
    getEpciInfos(query: string): Observable<any> {
        return this.http.get(this.apiUrl + "/epcis/" + query);
    }

    // Get SP type count
    getTypeCount(options: any): Observable<any> {
        return this.http.get(this.apiUrl + "/services_publics",{
            params: options
        });
    }
}
