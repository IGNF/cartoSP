import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodageService {

  private apiUrl = 'https://data.geopf.fr/geocodage/search';

  private apiExpressUrl = 'https://data.geopf.fr/wfs/ows';

  private defaultParams = {
    REQUEST: "GetFeature",
    OUTPUTFORMAT: "application/json",
    SRSNAME: "EPSG:3857",
    VERSION: "2.0.0",
    SERVICE: "WFS"
  };

  constructor(private http: HttpClient) {}

  // Search departementsautocomplete
  searchDepartement(query: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        q: query,
        limit: 5,
        index:"poi",
        category: "département",
        returntruegeometry: false
      }
    });
  }

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

  // Get adminexpress geometry
  getAdminExpressGeometry(query: string, type: string): Observable<any> {
    var req;
    if(type === "departement") {
      req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:departement",
        cql_filter:"code_insee='"+query+"'"
      });
    } else if(type === "epci") {
      req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:epci",
        cql_filter:"nom_officiel='"+query+"'"
      });
    } else if(type === "commune") {
      req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:commune",
        cql_filter:"nom_officiel='"+query+"'"
      });
    } else {
      throw new Error("Type non supporté pour la géométrie AdminExpress");
    }

    return this.http.get(this.apiExpressUrl,{
      params: req
    });
  }

  getAdminExpressDepartementGeometry(query: string): Observable<any> {
    var req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:departement",
        cql_filter:"code_insee='"+query+"'"
    });
    
    return this.http.get(this.apiExpressUrl,{
      params: req
    });
  }

  getCommuneByCodeInsee(codeInsee: string): Observable<any> {
    const params = {
      ...this.defaultParams,
      TYPENAME: 'ADMINEXPRESS-COG.LATEST:commune',
      cql_filter: `code_insee='${codeInsee}'`,
      COUNT: '1',
    };
    return this.http.get(this.apiExpressUrl, { params });
  }

  getDepartementByCode(codeDep: string): Observable<any> {
    const params = {
      ...this.defaultParams,
      TYPENAME: 'ADMINEXPRESS-COG.LATEST:departement',
      cql_filter: `code_insee='${codeDep}'`,
      COUNT: '1',
    };
    return this.http.get(this.apiExpressUrl, { params });
  }

}
