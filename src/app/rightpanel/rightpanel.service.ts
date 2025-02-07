import { Injectable } from '@angular/core';

import { RightpanelContentAreaDirective } from './rightpanel-content-area.directive';

import type { Type as Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RightpanelService {

  constructor() {}

  isExpanded = false;

  #contentArea?: RightpanelContentAreaDirective;

  toggleRightpanel() {
    this.isExpanded = !this.isExpanded;
  }

  setDynamicContentArea(host: RightpanelContentAreaDirective) {
    this.#contentArea = host;
  }

  setContent(component: Component<unknown>, data: any): void {
    this.#contentArea?.viewContainerRef.clear();
    this.#contentArea?.viewContainerRef.createComponent(component).setInput('data', data);
  }
}
