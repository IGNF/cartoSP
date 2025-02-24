import { Component, HostBinding, ViewChild, Input, AfterViewInit } from '@angular/core';

import { RightpanelService } from './rightpanel.service';
import { RightpanelContentAreaDirective } from './rightpanel-content-area.directive';

import Map from 'ol/Map';
import Control from 'ol/control/Control';

@Component({
  selector: 'app-rightpanel',
  standalone: true,
  imports: [RightpanelContentAreaDirective],
  templateUrl: './rightpanel.component.html',
  styleUrl: './rightpanel.component.css',
})
export class RightpanelComponent implements AfterViewInit {
  @Input() map!: Map;
  control!: Control;

  @ViewChild(RightpanelContentAreaDirective)
  rightpanelContentArea?: RightpanelContentAreaDirective;

  constructor(public rightpanelService: RightpanelService) {}

  ngAfterViewInit() {
    if (!this.rightpanelContentArea) {
      throw new Error('rightpanelContentArea is undefined');
    }

    this.rightpanelService.setDynamicContentArea(this.rightpanelContentArea);
  }

  @HostBinding('class.is-expanded')
  get isExpanded() {
    this.map.updateSize();
    return this.rightpanelService.isExpanded;
  }

}
