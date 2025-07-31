import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { GeoportalFullScreen } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-fullscreen',
  standalone: true,
  template: '',
  styles: [],
})
export class FullscreenComponent implements OnInit {  
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new GeoportalFullScreen({
      position : "bottom-right",
      source: document.getElementById("app-content")
    });

    this.map.addControl(this.control);
  }
}
