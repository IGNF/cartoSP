import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { SearchEngine, Searchdialog} from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-search',
  standalone: true,
  template: '',
  styles: ['']
})
export class SearchComponent implements OnInit {
  @Input() map!: Map;
  search!: Control;
  dialog!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    // Ajout du panel de recherche
    this.dialog = new Searchdialog({
        position: "top-left",
        panel: true,
    });
    this.map.addControl(this.dialog);

    // Ajout de l'outil de recherche dans le panel
    this.search = new SearchEngine({
      displayButtonClose: false,
      displayButtonAdvancedSearch: false,
      collapsible: true,
      splitResults: false,
      markerStyle: 'turquoiseBlue',
      zoomTo: 'auto',
      target: document.getElementById('searchmodal'),
      resources : {
        geocode : ["StreetAddress", "PositionOfInterest"],
        autocomplete : ["PositionOfInterest"],
        search: false
      },
      autocompleteOptions:{
        //prettifyResults: true,
        serviceOptions: {
          filterOptions: {
            type: "commune",
            poiType: "commune"
          }
        }
      }
    });   
    this.map.addControl(this.search);
  }
}
