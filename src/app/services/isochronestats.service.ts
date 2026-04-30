import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { getCenter } from 'ol/extent';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';

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

    getIsochroneStatsByBbox(options: any, isochrones: Feature[]): Observable<any> {
        return from(this.fetchAllPages(options, isochrones));
    }

    private async fetchAllPages(options: any, isochrones: Feature[]): Promise<any> {
        const pageSize = 5000;
        let startIndex = 0;
        const emptyTotals = () => ({ population: 0, nb_plus_65: 0, nb_men_pauv: 0 });
        const totals = emptyTotals();
        const intersectingTotals = emptyTotals();

        // Extract the first 2 characters of location_code or service_code for filtering
        const locationCode = options.location_code || options.service_code;
        const deptPrefix = locationCode ? String(locationCode).substring(0, 2) : null;

        const format = new GeoJSON();
        const isochroneGeometries4326 = Array.isArray(isochrones)
            ? isochrones
                .map((iso: Feature) => {
                    const geom = iso?.getGeometry?.()?.clone();
                    return geom ? geom.transform('EPSG:3857', 'EPSG:4326') : null;
                })
                .filter((g: any) => !!g)
            : [];

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

                let batch = response.features;
                if (deptPrefix) {
                    batch = batch.filter((feature: any) => {
                        const lcogGeo = feature.properties?.lcog_geo;
                        if (!lcogGeo) return false;
                        const values = String(lcogGeo).split(',').map((v: string) => v.trim());
                        return values.some((v: string) => v.startsWith(deptPrefix));
                    });
                }

                for (const feature of batch) {
                    const props = feature?.properties ?? {};
                    totals.population += Number(props.population ?? 0);
                    totals.nb_plus_65 += Number(props.nb_plus_65 ?? 0);
                    totals.nb_men_pauv += Number(props.nb_men_pauv ?? 0);

                    if (isochroneGeometries4326.length > 0) {
                        try {
                            const featureGeom = format.readGeometry(feature.geometry);
                            const center = getCenter(featureGeom.getExtent());
                            if (isochroneGeometries4326.some((g: any) => g.intersectsCoordinate(center))) {
                                intersectingTotals.population += Number(props.population ?? 0);
                                intersectingTotals.nb_plus_65 += Number(props.nb_plus_65 ?? 0);
                                intersectingTotals.nb_men_pauv += Number(props.nb_men_pauv ?? 0);
                            }
                        } catch { /* skip malformed geometry */ }
                    }
                }

                if (response.features.length < pageSize) {
                    break;
                }

                startIndex += pageSize;
            } catch (error) {
                console.error('Error fetching page at startIndex:', startIndex, error);
                break;
            }
        }

        const percentages = {
            population: totals.population > 0 ? (intersectingTotals.population / totals.population) * 100 : 0,
            nb_plus_65: totals.nb_plus_65 > 0 ? (intersectingTotals.nb_plus_65 / totals.nb_plus_65) * 100 : 0,
            nb_men_pauv: totals.nb_men_pauv > 0 ? (intersectingTotals.nb_men_pauv / totals.nb_men_pauv) * 100 : 0
        };

        return { totals, intersectingTotals, percentages };
    };

}
