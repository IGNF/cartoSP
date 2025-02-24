import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import {LayerSwitcher} from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerswitcher',
  standalone: true,
  imports: [],
  template: '',
  styles: ['::ng-deep .GPlayerRemove{display: none;}', '::ng-deep div[id^="GPlayerSwitcher"]{margin-bottom: 0px !important;}'],
})
export class LayerswitcherComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Controls top-left
    this.control = new LayerSwitcher({
      options: {
        position: "top-left",
        panel : true,
        counter : true  
      },
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
