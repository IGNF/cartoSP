import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { GeoportalOverviewMap } from "geopf-extensions-openlayers/src";

@Component({
    selector: 'app-minimap',
    imports: [],
    template: '',
    styleUrls: []
})
export class MinimapComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new GeoportalOverviewMap({
      position : "bottom-left",
      auto: true
    });

    this.map.addControl(this.control);
  }
}
