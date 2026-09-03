import { Component, OnInit, Input, ElementRef, inject } from '@angular/core';

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
  private elementRef = inject(ElementRef);
  
  @Input() map!: Map;
  control!: Control;

  ngOnInit() {
    this.control = new GeoportalFullScreen({
      position : "bottom-right",
      source: document.getElementById("app-content")
    });

    this.map.addControl(this.control);
  }
}
