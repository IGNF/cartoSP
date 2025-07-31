import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Legends } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-legende',
  standalone: true,
  template: '',
  styles: []
})
export class LegendeComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new Legends({
      collapsed: true,
      position: "top-left",
      panel: true,
      auto: true
    });

    this.map.addControl(this.control);
  }
}
