import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { LayerSwitcher } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerswitcher',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
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
      try {
        if (e.layer?.name != undefined && 
            e.target?._layers && 
            e.target._layers[2] != undefined && 
            e.target._layers[2].name === "base_carto_sp_18_02_gpkg_18-02-2026_wfs:carto_sp_18_02__base_carto_sp" &&
            e.target._layers[2].layer?.values_) {
            e.target._lastZIndex++;
            e.target._layers[2].layer.values_.zIndex = e.target._lastZIndex;
          if (e.target._updateLayersOrder) {
            e.target._updateLayersOrder();
          }
        }
      } catch (err) {
        console.warn('LayerSwitcher: Error ordering layers', err);
      }
    });

    this.map.addControl(this.control);
  }
}
