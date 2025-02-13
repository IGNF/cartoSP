import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { WfsFilter } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-spwfsfilter',
  standalone: true,
  imports: [],
  template: '',
  styles: []
})
export class SpwfsfilterComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    var styleCache = {
      "Administration locale": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/administrations-locales/implantation.svg',
        })
      }),
      "Association, culture, jeunesse": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/association-culture-jeunesse/implantation.svg',
        })
      }),
      "Droit, justice": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/droit-justice/implantation.svg',
        })
      }),
      "Economie, finances, consommation" : new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/finance/implantation.svg',
        })
      }),
      "Enseignement, recherche" : new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/enseignement-recherche/implantation.svg',
        })
      }),
      "Environnement, logement, transports": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/environnement/implantation.svg',
        })
      }),
      "Social, santé" : new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/social-sante/implantation.svg',
        })
      }),
      "Travail, emploi, formation": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/emploi-formation/implantation.svg',
        })
      })
    } as any;

    this.control = new WfsFilter({
      position: "top-left",
      cartospLayerName: "services_publics_test_20250116_v2:carto_sp_interne",
      zoomLevelLimit: 10,
      cartospStyles: styleCache
    });

    this.map.addControl(this.control);
  }
}
