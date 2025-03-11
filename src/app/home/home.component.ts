import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CarteComponent } from './../carte/carte.component';
import { SearchComponent } from './../controls/search/search.component';
import { LayerswitcherComponent } from './../controls/layerswitcher/layerswitcher.component';
import { IsochroneSimpleComponent } from './../controls/isochrone-simple/isochrone-simple.component';
import { LegendeComponent } from './../controls/legende/legende.component';
import { ZoomComponent } from './../controls/zoom/zoom.component';
import { AttributionComponent } from './../controls/attribution/attribution.component';
import { FullscreenComponent } from './../controls/fullscreen/fullscreen.component';
import { ScalelineComponent } from './../controls/scaleline/scaleline.component';
import { LayerselectorComponent } from '../controls/layerselector/layerselector.component';
import { SpwfsfilterComponent } from '../controls/spwfsfilter/spwfsfilter.component';
import { RightpanelComponent } from '../rightpanel/rightpanel.component';
import { SpselectorComponent } from '../controls/spselector/spselector.component';
import { IndicatorselectorComponent } from '../controls/indicatorselector/indicatorselector.component';

import { GeocodageService } from './../services/geocodage.service';

import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { SimpleGeometry } from 'ol/geom';

// @ts-ignore
import Gp from 'geoportal-access-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, CarteComponent, SearchComponent, LayerswitcherComponent, IsochroneSimpleComponent, LegendeComponent, ZoomComponent, FullscreenComponent, AttributionComponent, ScalelineComponent, LayerselectorComponent, SpwfsfilterComponent, RightpanelComponent, SpselectorComponent, IndicatorselectorComponent],
  providers: [GeocodageService]
})
export class HomeComponent implements OnInit {

  constructor(private GeocodageService: GeocodageService, private activatedRoute: ActivatedRoute) {}

  map!: Map;
  GpServiceError: boolean = false;
  defaultView: View = new View({
    center: [288074.8449901076, 5900000.515792289],
    zoom: 6,
  });
  defaultLocation: string|null = this.activatedRoute.snapshot.paramMap.get('location') || null;

  ngOnInit(): void {
    Gp.Services.getConfig({
      customConfigFile: 'assets/customConfig.json',
      onSuccess: () => {
        // set view location
        if(this.defaultLocation) this.locatedMap(this.defaultLocation);
        
        // set map and starting view
        this.map = new Map({
          view: this.defaultView
        });
      },
      onFailure : (error: any) => {
        this.GpServiceError = true;
        console.error('Error loading Gp config:', error);
      },
    });
  }

  locatedMap(location: string) {
    // set view map if different from default
    this.GeocodageService.getSearchTrueGeometry(location).subscribe({
        next : (response: any) => {
            const locationGeom = new GeoJSON().readFeatures(response.features[0].properties.truegeometry, {featureProjection: 'EPSG:3857'})[0].getGeometry();
            this.defaultView.fit(locationGeom as SimpleGeometry, {padding: [30,30,30,30]});
        },
        error : (error: any) => { console.error('Error fetching geocode datas:', error); this.GpServiceError = true; }
    });
  }
}
