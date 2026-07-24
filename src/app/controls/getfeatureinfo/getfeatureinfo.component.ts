import { Component, Input, OnInit } from '@angular/core';

import Map from 'ol/Map';

import { GetFeatureInfo } from 'geopf-extensions-openlayers/src';

@Component({
  selector: 'app-getfeatureinfo',
  imports: [],
  templateUrl: './getfeatureinfo.component.html',
  styleUrl: './getfeatureinfo.component.css',
})
export class GetfeatureinfoComponent implements OnInit {
  @Input() map!: Map;
  private control!: any;

  ngOnInit(): void {
    if (!this.map) {
      return;
    }

    this.control = new GetFeatureInfo({
      collapsed: true,
      position: 'top-right',
      noDataMessage: '<p class="fr-mb-0">Aucun résultat pour ce point.</p>'
    });

    // this.map.addControl(this.control);
  }
}
