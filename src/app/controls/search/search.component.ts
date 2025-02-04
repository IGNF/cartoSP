import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { SearchEngine } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-search',
  standalone: true,
  template: '',
  styles: ['::ng-deep .gpf-widget { position: unset;} ::ng-deep div[id^="GPautoCompleteList"] { margin-left: 26px; top: 60px;}']
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
