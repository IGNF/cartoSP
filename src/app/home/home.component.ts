import { Component, OnInit } from '@angular/core';
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
import { TerritoireComponent } from '../controls/territoire/territoire.component';
import { MinimapComponent } from '../controls/minimap/minimap.component';
import { LocalisationInfoComponent } from '../rightpanel/content/localisation-info/localisation-info.component';

import { GeocodageService } from './../services/geocodage.service';
import { RightpanelService } from './../rightpanel/rightpanel.service';

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
  imports: [CommonModule, CarteComponent, SearchComponent, LayerswitcherComponent, IsochroneSimpleComponent, LegendeComponent, ZoomComponent, FullscreenComponent, AttributionComponent, ScalelineComponent, LayerselectorComponent, SpwfsfilterComponent, RightpanelComponent, SpselectorComponent, IndicatorselectorComponent, TerritoireComponent, MinimapComponent],
  providers: [GeocodageService]
})
export class HomeComponent implements OnInit {

  constructor(private GeocodageService: GeocodageService, private activatedRoute: ActivatedRoute, private rightpanelService: RightpanelService) {}

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
    this.GeocodageService.getAdminExpressDepartementGeometry(location).subscribe({
        next : (response: any) => {
            const locationGeom = new GeoJSON().readFeatures(response.features[0].geometry)[0].getGeometry();
            this.defaultView.fit(locationGeom as SimpleGeometry, {padding: [20,20,20,20]});
            console.log("Location geometry:", response.features[0]);
            this.rightpanelService.setContent(LocalisationInfoComponent, {map : this.map, location: {name: response.features[0].properties.nom_officiel ,number: response.features[0].properties.code_insee }, type: "departement"}, "locationinfo");
        },
        error : (error: any) => { console.error('Error fetching geocode datas:', error); this.GpServiceError = true; }
    });
  }
}
