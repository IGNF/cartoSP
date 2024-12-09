import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteComponent } from './../carte/carte.component';
import { LayerswitcherComponent } from './../controls/layerswitcher/layerswitcher.component';
import { IsochroneSimpleComponent } from './../controls/isochrone-simple/isochrone-simple.component';
import { LegendeComponent } from './../controls/legende/legende.component';
import { ZoomComponent } from './../controls/zoom/zoom.component';
import { AttributionComponent } from './../controls/attribution/attribution.component';
import { FullscreenComponent } from './../controls/fullscreen/fullscreen.component';
import { ScalelineComponent } from './../controls/scaleline/scaleline.component';
import { SearchComponent } from './../controls/search/search.component';

import Map from 'ol/Map';
import View from 'ol/View';
// @ts-ignore
import Gp from 'geoportal-access-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, CarteComponent, LayerswitcherComponent, IsochroneSimpleComponent, LegendeComponent, ZoomComponent, FullscreenComponent, AttributionComponent, ScalelineComponent, SearchComponent]
})
export class HomeComponent implements OnInit {

  map!: Map;

  ngOnInit(): void {
    Gp.Services.getConfig({
      customConfigFile: "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/fullConfig.json",
      onSuccess: () => {
        this.createMap();
      },
      // @ts-ignore
      onFailure : (e) => {
        console.error(e);
      }
    });
  }

  createMap() {
    this.map = new Map({
      view: new View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 5,
      })
    });
  }
}
