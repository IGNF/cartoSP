import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
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

    var styleCache = {
      "Administration locale": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/administrations-locales/implantation.svg',
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
          src: 'assets/images/mapmarker/droit-justice/implantation.svg',
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
      }),

      "Environnement, logement, transports": new Style({
        image: new Icon({
          anchor: [0.5, 37],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/images/mapmarker/environnement/implantation.svg',
        })
      })
    } as any;

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
            return styleCache[feature.getProperties()['thematique']];
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