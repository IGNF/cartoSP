import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

  private apiUrl = 'https://data.geopf.fr/wfs/ows';

  private defaultParams = {
    REQUEST: "GetFeature",
    OUTPUTFORMAT: "application/json",
    SRSNAME: "EPSG:3857",
    VERSION: "2.0.0",
    SERVICE: "WFS"
  };

  constructor(private http: HttpClient) {}

  getCommuneFromBbox(bbox: string): Observable<any> {
    var req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:commune",
        BBOX: bbox + ",EPSG:3857"
    });

    return this.http.get(this.apiUrl,{
      params: req
    });
  }

  // Geometry
  getEpciFromBbox(bbox: string): Observable<any> {
    var req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:epci",
        PROPERTYNAME: "id,nom,code_siren",
        BBOX: bbox + ",EPSG:3857"
    });

    return this.http.get(this.apiUrl,{
      params: req
    });
  }

  getDepartementFromBbox(bbox: string): Observable<any> {
    var req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:departement",
        PROPERTYNAME: "id,nom,insee_dep",
        BBOX: bbox + ",EPSG:3857"
    });

    return this.http.get(this.apiUrl,{
      params: req
    });
  }

  getDepartementFromId(name: string): Observable<any> {
    var req = Object.assign(this.defaultParams, {
        TYPENAME: "ADMINEXPRESS-COG.LATEST:departement",
        PROPERTYNAME: "id,nom,insee_dep,geom",
        cql_filter:"name="+name
    });

    return this.http.get(this.apiUrl,{
      params: req
    });
  }
}