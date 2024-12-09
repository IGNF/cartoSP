import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import { LayerWMS as GeoportalLayerWMS, LayerWMTS as GeoportalLayerWMTS,} from "geopf-extensions-openlayers/src";

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
      new GeoportalLayerWMS({
        apikey:"full",
        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
      }),
      new GeoportalLayerWMS({
        apikey:"full",
        layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
      }),
      new GeoportalLayerWMTS({
        apikey:"full",
        layer: "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST",
      }),
    ]);

    this.map.setTarget(this.elementRef.nativeElement);
  }

}