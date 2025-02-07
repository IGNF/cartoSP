import { Component, Input, ElementRef, OnInit } from '@angular/core';

import Map from 'ol/Map';
import Style, { StyleLike } from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import {Select} from 'ol/interaction';
import { Feature } from 'ol';

import { RightpanelService } from '../../rightpanel/rightpanel.service';
import { DefaultComponent } from '../../rightpanel/content/default/default.component';
import { ServicePublicComponent } from '../../rightpanel/content/service-public/service-public.component';


@Component({
  selector: 'app-spselector',
  standalone: true,
  imports: [],
  template: '',
})
export class SpselectorComponent implements OnInit {
  @Input() map!: Map;
  control!: Select;

  constructor(private elementRef: ElementRef, private rightpanelService: RightpanelService) {}

  ngOnInit() {
    var oldfeature: Feature;
    var oldstyle: StyleLike | undefined;
    
    // marker style select
    var selectStyle = new Style({
      image: new Icon({
        anchor: [0.5, 37],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/images/mapmarker/pin.svg',
      })
    });

    var splayer = this.map.getAllLayers()[2];

    this.map.on('click', evt => {
      let features = this.map.getFeaturesAtPixel(evt.pixel, {
          layerFilter: (layer) => {
              return splayer == layer;
          },
      });
      
      if(features[0]){
        var newfeature = features[0] as Feature;
        
        // restore old style
        if(oldfeature){
          oldfeature.setStyle(oldstyle);
        }

        // saving old feature
        oldfeature = newfeature;
        oldstyle = oldfeature.getStyle();
        
        newfeature.setStyle(selectStyle);
        if(this.rightpanelService.isExpanded !== true ){
          this.rightpanelService.toggleRightpanel();
        }
        this.rightpanelService.setContent(ServicePublicComponent, newfeature.getProperties());
      }else{
        if(oldfeature){
          oldfeature.setStyle(oldstyle);
        }
      }
    });
  }
}
