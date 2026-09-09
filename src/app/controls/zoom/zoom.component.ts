import { Component, OnInit, Input, ElementRef, inject } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import {GeoportalZoom} from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-zoom',
  standalone: true,
  template: '',
  styles: [],
})
export class ZoomComponent implements OnInit {
  private elementRef = inject(ElementRef);

  @Input() map!: Map;
  control!: Control;

  ngOnInit() {
    this.control = new GeoportalZoom({
      position: "bottom-right",
      target: this.elementRef.nativeElement,
    });

    this.map.addControl(this.control);
  }
}
