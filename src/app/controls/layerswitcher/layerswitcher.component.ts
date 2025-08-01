import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { LayerSwitcher } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerswitcher',
  standalone: true,
  imports: [],
  template: '',
  styles: ['::ng-deep .GPlayerRemove, ::ng-deep .GPlayerGreyscale{display: none;}', '::ng-deep div[id^="GPlayerSwitcher"]{margin-bottom: 0px !important;}'],
})
export class LayerswitcherComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Controls top-left
    this.control = new LayerSwitcher({
      options: {
        position: "top-left",
        panel: true,
        counter: true
      },
    });

    this.control.addEventListener("layerswitcher:add", function (e: any) {
      if(e.layer.name != undefined && e.target._layers[2] != undefined && e.target._layers[2].name == "services_publics_test_20250616:carto_sp_interne"){
        e.target._lastZIndex++;
        e.target._layers[2].layer.values_.zIndex = e.target._lastZIndex;
        e.target._updateLayersOrder();
      }
    });

    this.map.addControl(this.control);
  }
}
