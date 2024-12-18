import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import { LayerWMS as GeoportalLayerWMS, LayerWMTS as GeoportalLayerWMTS, LayerWFS as GeoportalLayerWFS} from "geopf-extensions-openlayers/src";

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
        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
      }),
      new GeoportalLayerWMS({
        layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
      }),
      new GeoportalLayerWMTS({
        layer: "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST",
      }),
      new GeoportalLayerWFS({
        layer: "poc_v5_carto_sp_interne_sans_z_gpkg_13-12-2024_wfs:carto_sp_interne",
      })
    ]);

    this.map.setTarget(this.elementRef.nativeElement);
  }

}