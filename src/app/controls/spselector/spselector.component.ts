import { Component, Input, ElementRef, OnInit, inject } from '@angular/core';

import Map from 'ol/Map';
import Style, { StyleLike } from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import {Select} from 'ol/interaction';
import { Feature } from 'ol';

import { RightpanelService } from '../../rightpanel/rightpanel.service';
import { ServicePublicComponent } from '../../rightpanel/content/service-public/service-public.component';


@Component({
    selector: 'app-spselector',
    imports: [],
    template: ''
})
export class SpselectorComponent implements OnInit {
  private elementRef = inject(ElementRef);
  private rightpanelService = inject(RightpanelService);

  @Input() map!: Map;
  control!: Select;

  ngOnInit() {
    let oldfeature: Feature;
    let oldstyle: StyleLike | undefined;
    
    // marker style select
    const selectStyle = new Style({
      image: new Icon({
        anchor: [0.5, 37],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/images/mapmarker/pin.svg',
      })
    });

    const splayer = this.map.getAllLayers()[2];

    this.map.on('click', evt => {
      const features = this.map.getFeaturesAtPixel(evt.pixel, {
          layerFilter: (layer) => {
              return splayer == layer;
          },
      });
      
      if(features[0]){
        const newfeature = features[0] as Feature;
        
        // restore old style
        if(oldfeature){
          oldfeature.setStyle(oldstyle);
        }

        // saving old feature
        oldfeature = newfeature;
        oldstyle = oldfeature.getStyle();
        
        newfeature.setStyle(selectStyle);

        // show rightpanel with feature infos
        if(this.rightpanelService.isExpanded !== true ){
          this.rightpanelService.toggleRightpanel();
        }
        this.rightpanelService.setContent(ServicePublicComponent, {selectedSP: newfeature.getProperties(), map: this.map}, "spinfos");
      }else{
        if(oldfeature){
          oldfeature.setStyle(oldstyle);
        }
      }
    });
  }
}
