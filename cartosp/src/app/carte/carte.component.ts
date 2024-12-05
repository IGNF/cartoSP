import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import ScaleLine from 'ol/control/ScaleLine';

import {
  CRS,
  GeoportalAttribution,
  GeoportalFullScreen,
  GeoportalZoom,
  LayerSwitcher,
  SearchEngine,
  Legends,
  Isocurve,
} from "../../../node_modules/geopf-extensions-openlayers/src/index";

// @ts-ignore
import Gp from 'geoportal-access-lib';


@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css'
})
export class CarteComponent implements OnInit {
  map: Map = new Map;

  ngOnInit(): void {
    Gp.Services.getConfig({
      customConfigFile: "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/fullConfig.json",
      onSuccess: () => {
        this.createMap();
      }
    });
  }

  createMap() {  
    this.map = new Map({
      view: new View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 5,
      }),
      layers: [
        new TileLayer({
          source: new TileWMS({
            params: {'LAYERS':'ORTHOIMAGERY.ORTHOPHOTOS'},
            url: 'https://data.geopf.fr/wms-r',
            attributions: ['<a href="https://geoservices.ign.fr/">© Géoservices</a> <a href="http://www.ign.fr/">© IGN <img src="https://data.geopf.fr/annexes/ressources/logos/ign.gif" title="Institut national de l\'' +
    'information géographique et forestière" alt="IGN"></a></li>'],
          }),
        })
      ],
      target: 'ol-map'
    });


    
    CRS.load();

    // Controls top-left
    var layerSwitcher = new LayerSwitcher({
      options: {
        position: "top-left",
        panel : true,
        counter : true  
      }
    });
    this.map.addControl(layerSwitcher);

    var iso = new Isocurve({
      position: "top-left"
    });
    this.map.addControl(iso);

    var legends = new Legends({
      collapsed: true,
      position: "top-left",
      panel: true,
      auto: true,
      info: true
    });
    this.map.addControl(legends);

    // Controls bottom-left
    var scale = new ScaleLine();
    this.map.addControl(scale);

    // Controls top-right
    var search = new SearchEngine({
      target: 'position-container-top-right',
      collapsed: false,
      collapsible: false,
      displayButtonClose: false,
      zoomTo: 'auto',
    });
    this.map.addControl(search);

    // Controls bottom-right
    var zoom = new GeoportalZoom({
      position: "bottom-right"
    });
    this.map.addControl(zoom);

    var fullscreen = new GeoportalFullScreen({
      position : "bottom-right"
    });
    this.map.addControl(fullscreen);

    var attributions = new GeoportalAttribution();
    this.map.addControl(attributions);

  }
}
