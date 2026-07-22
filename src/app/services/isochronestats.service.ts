import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, firstValueFrom } from 'rxjs';
import { Extent, getCenter, intersects } from 'ol/extent';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';

type Totals = { population: number; nb_plus_65: number; nb_men_pauv: number };
type StatsResult = { totals: Totals; intersectingTotals: Totals; percentages: Totals };

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

    getIsochroneStatsByBbox(options: any, isochrones: Feature[]): Observable<StatsResult> {
        return from(this.fetchAllPages(options, isochrones));
    }

    private isMatchingDeptPrefix(lcogGeo: unknown, deptPrefixRegex: RegExp): boolean {
        if (!lcogGeo) {
            return false;
        }
        return deptPrefixRegex.test(String(lcogGeo));
    }



    private isInsideAnyIsochrone(center: number[], featureExtent: Extent, isochroneGeometries4326: any[], isochroneExtents4326: Extent[]): boolean {
        for (let idx = 0; idx < isochroneGeometries4326.length; idx += 1) {
            if (!intersects(featureExtent, isochroneExtents4326[idx])) {
                continue;
            }
            if (isochroneGeometries4326[idx].intersectsCoordinate(center)) {
                return true;
            }
        }

        return false;
    }

    private async fetchPage(options: any, pageSize: number, startIndex: number): Promise<any[]> {
        const req: any = Object.assign({}, this.defaultParams, {
            bbox: options.bbox,
            count: pageSize,
            startIndex: startIndex
        });

        const response = await firstValueFrom(this.http.get<any>(this.apiUrl, { params: req }));
        return Array.isArray(response?.features) ? response.features : [];
    }

    private async fetchAllPages(options: any, isochrones: Feature[]): Promise<StatsResult> {
        const pageSize = 5000;
        const maxConcurrentRequests = 2;
        let startIndex = 0;
        const emptyTotals = () => ({ population: 0, nb_plus_65: 0, nb_men_pauv: 0 });
        const totals = emptyTotals();
        const intersectingTotals = emptyTotals();

        // Extract the first 2 characters of location_code or service_code for filtering
        const locationCode = options.location_code || options.service_code;
        const deptPrefix = locationCode ? String(locationCode).substring(0, 2) : null;
        const deptPrefixRegex = deptPrefix ? new RegExp(`(^|,\\s*)${deptPrefix}`) : null;

        // Create GeoJSON format instance once (reuse across all pages)
        const format = new GeoJSON();
        const isochroneGeometries4326: any[] = [];
        const isochroneExtents4326: Extent[] = [];
        
        // Extract isochrone geometries with cloning to preserve originals for map display
        if (Array.isArray(isochrones)) {
            for (let idx = 0; idx < isochrones.length; idx += 1) {
                const geom = isochrones[idx]?.getGeometry?.()?.clone();
                if (geom) {
                    const transformed = geom.transform('EPSG:3857', 'EPSG:4326');
                    isochroneGeometries4326.push(transformed);
                    isochroneExtents4326.push(transformed.getExtent());
                }
            }
        }
        
        const shouldCheckIsochrones = isochroneGeometries4326.length > 0;

        let hasMorePages = true;
        while (hasMorePages) {
            const pageIndexes = Array.from(
                { length: maxConcurrentRequests },
                (_, index) => startIndex + (index * pageSize)
            );

            try {
                const pageResults = await Promise.all(
                    pageIndexes.map((pageStart) => this.fetchPage(options, pageSize, pageStart))
                );

                for (let pageIdx = 0; pageIdx < pageResults.length; pageIdx += 1) {
                    const features = pageResults[pageIdx];
                    if (features.length === 0) {
                        hasMorePages = false;
                        break;
                    }

                    for (let featureIdx = 0; featureIdx < features.length; featureIdx += 1) {
                        const feature = features[featureIdx];
                        const props = feature?.properties ?? {};
                        const popValue = Number(props.population ?? 0);
                        const ageValue = Number(props.nb_plus_65 ?? 0);
                        const povertyValue = Number(props.nb_men_pauv ?? 0);

                        // Skip dept prefix check if regex not compiled
                        if (deptPrefixRegex && !this.isMatchingDeptPrefix(props.lcog_geo, deptPrefixRegex)) {
                            continue;
                        }

                        totals.population += popValue;
                        totals.nb_plus_65 += ageValue;
                        totals.nb_men_pauv += povertyValue;

                        // Lazy geometry parsing: Only parse if feature has data and isochrones exist
                        if (!shouldCheckIsochrones || (popValue === 0 && ageValue === 0 && povertyValue === 0)) {
                            continue;
                        }

                        // Parse geometry only when needed
                        let featureGeom: any;
                        let featureExtent: Extent;
                        try {
                            featureGeom = format.readGeometry(feature.geometry);
                            featureExtent = featureGeom.getExtent();
                        } catch {
                            // Skip malformed geometry
                            continue;
                        }

                        // Early exit: Check if feature extent overlaps with any isochrone extent before coordinate check
                        let hasExtentOverlap = false;
                        for (let isoIdx = 0; isoIdx < isochroneExtents4326.length; isoIdx += 1) {
                            if (intersects(featureExtent, isochroneExtents4326[isoIdx])) {
                                hasExtentOverlap = true;
                                break;
                            }
                        }

                        // Only compute center and check coordinate intersection if extent overlaps
                        if (hasExtentOverlap) {
                            const center = getCenter(featureExtent);
                            if (this.isInsideAnyIsochrone(center, featureExtent, isochroneGeometries4326, isochroneExtents4326)) {
                                intersectingTotals.population += popValue;
                                intersectingTotals.nb_plus_65 += ageValue;
                                intersectingTotals.nb_men_pauv += povertyValue;
                            }
                        }
                    }

                    if (features.length < pageSize) {
                        hasMorePages = false;
                        break;
                    }
                }

                startIndex += pageSize * maxConcurrentRequests;
            } catch (error) {
                console.error('Error fetching page batch at startIndex:', startIndex, error);
                hasMorePages = false;
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
