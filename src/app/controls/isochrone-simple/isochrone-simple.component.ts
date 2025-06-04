import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { CartospIsocurve } from "geopf-extensions-openlayers/src";
import { RightpanelService } from '../../rightpanel/rightpanel.service';
import { LocalisationInfoComponent } from '../../rightpanel/content/localisation-info/localisation-info.component';

@Component({
  selector: 'app-isochrone-simple',
  standalone: true,
  template: '',
  styles: []
})
export class IsochroneSimpleComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef, private rightpanelService: RightpanelService) {}

  ngOnInit() {
    this.control = new CartospIsocurve({
      position : "top-left",
      target: this.elementRef.nativeElement,
      typologyLocations: [
        {nom:"Hautes-Alpes", code: "05", bbox: [5.4184,44.1865,7.0771,45.1268]}, 
        {nom:"Indre", code: "36", bbox: [0.8675,46.3471,2.2046,47.2773]}, 
        {nom:"Nord", code: "59", bbox: [2.0677,49.9691,4.2311,51.089]} 
      ],
      typologyLayers: [
        {title:"CAF", layername: "CAF_isochrone20", time: "20 min"},
        {title:"CPAM", layername: "CPAM_isochrone20", time: "20 min"},
        {title:"France Renov'", layername: "FranceRenov_isochrone20", time: "20 min"},
        {title:"France Service", layername: "FranceService_isochrone20", time: "20 min"},
        {title:"France Travail", layername: "FranceTravail_isochrone20", time: "20 min"},
        {title:"MDS", layername: "MDS_isochrone20", time: "20 min"},
        {title:"MSA", layername: "MSA_isochrone20", time: "20 min"},
        {title:"Point Justice CDAD", layername: "PointJustice_CDAD_isochrone20", time: "20 min"},
        {title:"SIP", layername: "SIP_isochrone20", time: "20 min"},
        {title:"URSSAF", layername: "URSSAF_isochrone20", time: "20 min"},
        {title:"Carsat", layername: "carsat_isochrone20", time: "20 min"},
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

    this.control.addEventListener("isochrone:add",  (e: any) => {
      this.rightpanelService.setContent(LocalisationInfoComponent,{map : this.map, location: {name: e.layer.values_.name_location,number: e.layer.values_.location}, type: "departement", isochronecall: true}, "locationinfo");
      this.map.getView().fit(e.layer.values_.extent);
    });

    this.control.addEventListener("isochrone:remove",  (e: any) => {
      this.rightpanelService.setContent(LocalisationInfoComponent,{map : this.map, location: {name: e.layer.values_.name_location,number: e.layer.values_.location}, type: "departement", isochronecall: true}, "locationinfo");
    });

    this.map.addControl(this.control);
  }
}
