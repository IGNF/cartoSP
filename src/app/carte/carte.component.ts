import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { LayerWFS as GeoportalLayerWFS, LayerMapBox as GeoportalLayerTMS } from "geopf-extensions-openlayers/src";  
import Overlay from 'ol/Overlay';

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
        style: "desaturated-ign"
      }, {declutter: true}),
      new GeoportalLayerTMS({
        layer: "ADMIN_EXPRESS",
        style: "simpleadminexpress"
      }),
      new GeoportalLayerWFS({
        layer: "IGNF_CARTO-SP_SERVICES-PUBLICS:__infos",
        maxFeatures: 3000,
        olParams : {
          minZoom: 8,
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

    const overlay = new Overlay({
      //@ts-ignore
      element: document.getElementById("tooltip-feature")
    });
    
    this.map.on('pointermove', function (evt) {
      var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        if (evt.dragging) {
          //@ts-ignore
          document.getElementById("tooltip-feature").style.visibility = 'hidden';
          evt.map.getTargetElement().style.cursor = '';
          return null;
        }
        //@ts-ignore
        if(layer.name === "IGNF_CARTO-SP_SERVICES-PUBLICS:__infos"){
          return feature;
        }else{
          return null;
        }
      });
      
      if(feature){
        const coordinate = evt.coordinate;
        //@ts-ignore
        if(feature.values_.type_structure == "Permanence"){
          //@ts-ignore
          document.getElementById("tooltip-feature").innerHTML = '<div>' + feature.values_.nom + '</div>';
        }else{
          //@ts-ignore
          document.getElementById("tooltip-feature").innerHTML = '<div>' + feature.values_.nom + '</div>';
        }
        
        overlay.setPosition(coordinate);
        overlay.setOffset([10,12]);

        //@ts-ignore
        document.getElementById("tooltip-feature").style.visibility = 'visible';
        evt.map.getTargetElement().style.cursor = 'pointer';
      }else{
        //@ts-ignore
        document.getElementById("tooltip-feature").style.visibility = 'hidden';
        evt.map.getTargetElement().style.cursor = '';
      }
    });

    this.map.getTargetElement().addEventListener('pointerleave', function () {
      //@ts-ignore
      document.getElementById("tooltip-feature").style.visibility = 'hidden';
    });

    this.map.addOverlay(overlay);
  }
}