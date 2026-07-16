import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { LayerWFS as GeoportalLayerWFS, LayerMapBox as GeoportalLayerTMS } from "geopf-extensions-openlayers/src";  
import Overlay from 'ol/Overlay';
// import TileWMS from 'ol/source/TileWMS';
// import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';

@Component({
    selector: 'app-carte',
    template: '',
    styleUrl: './carte.component.css',
    imports: []
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
    
    // Event pour afficher le tooltip lorsque la souris passe sur un point SP
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

    // event pour cacher le tooltip lorsque la souris quitte le point SP
    this.map.getTargetElement().addEventListener('pointerleave', function () {
      //@ts-ignore
      document.getElementById("tooltip-feature").style.visibility = 'hidden';
    });

    // Event pour récupérer les informations des couches WMS au clic
    /*this.map.on('click', (evt) => {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();

      if (viewResolution === undefined) {
        return;
      }

      const featurePromises: Promise<{ layerName: string; features: Feature[] }>[] = [];

      this.map.getLayers().forEach((layer) => {
        const source = (layer as any).getSource?.();
        if (!(source instanceof TileWMS)) {
          return;
        }

        const layerName: string = layer.get('name') || '(unnamed)';
        console.log(layer);
        const url = source.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          projection,
          { INFO_FORMAT: 'application/vnd.ogc.gml' }
        );

        if (!url) {
          return;
        }

        const promise = fetch(url)
          .then((response) => response.text())
          .then((text) => ({
            layerName,
            features: new WMSGetFeatureInfo({ layers: [layerName] }).readFeatures(text) as Feature[]
          }));

        featurePromises.push(promise);
      });

      Promise.all(featurePromises).then((results) => {
        const allFeatures = results.flatMap(({ layerName, features }) =>
          features.map((feature) => ({ layerName, feature }))
        );
        console.log('All WMS features clicked:', allFeatures);
      });
    });*/

    this.map.addOverlay(overlay);
  }
}