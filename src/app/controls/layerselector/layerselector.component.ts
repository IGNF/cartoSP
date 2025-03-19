import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Layerselector } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerselector',
  standalone: true,
  imports: [],
  template: '',
  styles: ['::ng-deep dialog[id^="GPcatalogPanel-"] { top: unset !important; bottom:3px!important; }'],
})
export class LayerselectorComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var LayerSelectorList = [
      {layername : "PLAN.IGN", title : "Gris", layertype : "TMS", style : "desatured-ign", img: "assets/images/layerselector/Gris.png" },
      {layername : "ORTHOIMAGERY.ORTHOPHOTOS", title : "Aérienne", layertype : "WMS", style : null, img: "assets/images/layerselector/Aérienne.png" }, 
      {layername : "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", title : "Relief", layertype : "WMS", style : null, img: "assets/images/layerselector/Relief.png" }   
    ];

    this.control = new Layerselector({
      position: "bottom-left",
      panel: true,
      layerSelectorList : LayerSelectorList
    });

    this.map.addControl(this.control);
  }

}