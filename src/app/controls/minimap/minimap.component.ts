import { Component, OnInit, Input, ElementRef, inject } from '@angular/core';

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
  private elementRef = inject(ElementRef);

  @Input() map!: Map;
  control!: Control;

  ngOnInit() {
    this.control = new GeoportalOverviewMap({
      position : "bottom-left",
      auto: true
    });

    this.map.addControl(this.control);
  }
}
