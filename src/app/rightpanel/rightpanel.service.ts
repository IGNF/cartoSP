import { Injectable } from '@angular/core';

import { RightpanelContentAreaDirective } from './rightpanel-content-area.directive';

import type { Type as Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RightpanelService {

  constructor() {}

  isExpanded = true;

  currentView: "location" | "locationinfo" | "spinfos" = "location";

  #contentArea?: RightpanelContentAreaDirective;

  toggleRightpanel() {
    this.isExpanded = !this.isExpanded;
  }

  setCurrentView(selectedView: "location" | "locationinfo" | "spinfos"){
    this.currentView = selectedView;
  }

  setDynamicContentArea(host: RightpanelContentAreaDirective) {
    this.#contentArea = host;
  }

  setContent(component: Component<unknown>, data: any, view: "location" | "locationinfo" | "spinfos"): void {
    this.#contentArea?.viewContainerRef.clear();
    this.#contentArea?.viewContainerRef.createComponent(component).setInput('data', data);
    this.currentView = view;
  }
}
