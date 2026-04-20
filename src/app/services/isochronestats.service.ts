import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsochroneStatsService {

    public apiUrl = 'https://data.geopf.fr/wfs/ows';
    
    private defaultParams = {  
        REQUEST: "GetFeature",
        OUTPUTFORMAT: "application/json",
        SRSNAME: "EPSG:4326",
        VERSION: "2.0.0",
        SERVICE: "WFS",
        typename: "IGNF_CARTO-SP_CARREAU-200m:indicateurs"
    };
    
    constructor(private http: HttpClient) {}

    getIsochroneStatsByBbox(options: any): Observable<any> {
        return from(this.fetchAllPages(options));
    }

    private async fetchAllPages(options: any): Promise<any> {
        const pageSize = 5000;
        let startIndex = 0;
        let allFeatures: any[] = [];
        
        // Extract the first 2 characters of location_code or service_code for filtering
        const locationCode = options.location_code || options.service_code;
        const deptPrefix = locationCode ? String(locationCode).substring(0, 2) : null;

        while (true) {
            const req = Object.assign({}, this.defaultParams, {
                bbox: options.bbox,
                count: pageSize,
                startIndex: startIndex
            });

            try {
                const response = await this.http.get<any>(this.apiUrl, { params: req }).toPromise();
                
                if (!response || !Array.isArray(response.features)) {
                    break;
                }

                // Filter features by location_code prefix if provided
                let batch = response.features;
                if (deptPrefix) {
                    batch = response.features.filter((feature: any) => {
                        const lcogGeo = feature.properties?.lcog_geo;
                        if (!lcogGeo) return false;
                        
                        // Handle multiple comma-separated values
                        const values = String(lcogGeo).split(',').map(v => v.trim());
                        return values.some(v => v.startsWith(deptPrefix));
                    });
                }

                allFeatures.push(...batch);

                // Stop if we got fewer features than the page size (last page)
                if (response.features.length < pageSize) {
                    break;
                }

                startIndex += pageSize;
            } catch (error) {
                console.error('Error fetching page at startIndex:', startIndex, error);
                break;
            }
        }

        return {
            type: 'FeatureCollection',
            features: allFeatures
        };
    };

}
