import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { LayerWMTS as GeoportalLayerWMTS, LayerWFS as GeoportalLayerWFS, LayerMapBox as GeoportalLayerTMS } from "geopf-extensions-openlayers/src";

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
      new GeoportalLayerTMS({
        layer: "PLAN.IGN",
        style: "gris"
      }),
      new GeoportalLayerWMTS({
        layer: "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST",
      }),
      new GeoportalLayerWFS({
        layer: "services_publics_test_20250213:carto_sp_interne",
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