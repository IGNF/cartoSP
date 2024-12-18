import { Component, OnInit, Input } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import ScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-scaleline',
  standalone: true,
  template: '',
  styles: ['::ng-deep .ol-scale-line{left: 60px;}']
})
export class ScalelineComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor() {}

  ngOnInit() {
    this.control = new ScaleLine();
    this.map.addControl(this.control);
  }
}
