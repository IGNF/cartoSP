import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { LayerWMTS as GeoportalLayerWMTS, LayerWFS as GeoportalLayerWFS } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-carte',
  template: '',
  styleUrl: './carte.component.css',
  imports:[],
  standalone: true,
})
export class CarteComponent implements OnInit {
  @Input() map!: Map;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    this.map.setLayers([
      new GeoportalLayerWMTS({
        layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
      }),
      new GeoportalLayerWMTS({
        layer: "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST",
      }),
      new GeoportalLayerWFS({
        layer: "mvp_carto20241219_bis_gpkg_20-12-2024_wfs:mvp_carto20241219_bis",
        olParams : {
          minZoom: 10,
          style: function(feature: Feature){
            return undefined;
          },
          sourceParams: {
            strategy: bboxStrategy,
          }
        }
      })
    ]);

    this.map.setTarget(this.elementRef.nativeElement);
  }

}