import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Territories } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-territoire',
  standalone: true,
  template: '',
  styles: []
})
export class TerritoireComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new Territories({
      position : "bottom-left",
      auto: true,
      thumbnail: false,
      reduce: false,
      tiles: 0,
      id: "territoires",
    });

    this.map.addControl(this.control);
  }
}
