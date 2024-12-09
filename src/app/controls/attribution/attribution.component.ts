import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { GeoportalAttribution } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-attribution',
  standalone: true,
  template: '',
  styles: ['::ng-deep .ol-attribution{right: 16px;}'],
})
export class AttributionComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new GeoportalAttribution();

    this.map.addControl(this.control);
  }
}
