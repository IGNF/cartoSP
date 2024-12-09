import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Isocurve } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-isochrone-simple',
  standalone: true,
  template: '',
  styles: []
})
export class IsochroneSimpleComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new Isocurve({
      position : "top-left",
      target: this.elementRef.nativeElement,
    });

    this.map.addControl(this.control);
  }
}
