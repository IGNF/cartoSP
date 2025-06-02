import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { CartospIsocurve } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-isochrone-simple',
  standalone: true,
  template: '',
  styles: []
})
export class IsochroneSimpleComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new CartospIsocurve({
      position : "top-left",
      target: this.elementRef.nativeElement,
      typologyLocations: [
        {nom:"05 - Hautes-Alpes", code: "05", bbox: [5.4184,44.1865,7.0771,45.1268]}, 
        {nom:"36 - Indre", code: "36", bbox: [0.8675,46.3471,2.2046,47.2773]}, 
        {nom:"59 - Nord", code: "59", bbox: [2.0677,49.9691,4.2311,51.089]} 
      ],
      typologyLayers: [
        {title:"CAF", layername: "CAF_isochrone20", time: "20 min"},
        {title:"CAF", layername: "CAF_isochrone30", time: "30 min"},
        {title:"CPAM", layername: "CPAM_isochrone30", time: "30 min"},
        {title:"France Renov'", layername: "FranceRenov_isochrone30", time: "30 min"},
        {title:"France Service", layername: "FranceService_isochrone30", time: "30 min"},
        {title:"France Travail", layername: "FranceTravail_isochrone30", time: "30 min"},
        {title:"MDS", layername: "MDS_isochrone30", time: "30 min"},
        {title:"MSA", layername: "MSA_isochrone30", time: "30 min"},
        {title:"Point Justice CDAD", layername: "PointJustice_CDAD_isochrone30", time: "30 min"},
        {title:"SIP", layername: "SIP_isochrone30", time: "30 min"},
        {title:"URSSAF", layername: "URSSAF_isochrone30", time: "30 min"},
        {title:"Carsat", layername: "carsat_isochrone30", time: "30 min"}
      ]
    });

    /*this.control.addEventListener("isochrone:add", function (e: any) {
      console.log(e);
      this.rightpanelService.setContent(LocalisationInfoComponent, {map : this.data, location: selected, type: this.currentTab}, "locationinfo");
    });

    this.control.addEventListener("isochrone:remove", function (e: any) {
      console.log(e); 
    });*/

    this.map.addControl(this.control);
  }
}
