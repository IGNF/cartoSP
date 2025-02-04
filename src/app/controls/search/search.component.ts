import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON';
import Control from 'ol/control/Control';
import { SearchEngine } from "geopf-extensions-openlayers/src";
// @ts-ignore
import Gp from 'geoportal-access-lib';
import { Extent } from 'ol/extent';
import { SimpleGeometry } from 'ol/geom';

@Component({
  selector: 'app-search',
  standalone: true,
  template: '',
  styles: ['::ng-deep [id^="GPsearchEngine-"], ::ng-deep .GPsearchRadioContainer{right: 0px !important;top: 190px;left: unset !important;}']
})
export class SearchComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new SearchEngine({
      displayButtonClose: false,
      displayButtonAdvancedSearch: false,
      collapsible: true,
      splitResults: false,
      markerStyle: 'turquoiseBlue',
      zoomTo: 'auto',
      target: this.elementRef.nativeElement,
    });
   
    this.map.addControl(this.control);
  }
}
