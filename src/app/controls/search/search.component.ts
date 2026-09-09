import { Component, OnInit, Input, ElementRef, inject } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Searchdialog, SearchEngineAdvanced} from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-search',
  standalone: true,
  template: '',
  styles: ['::ng-deep .geolocatebutton { left: 2px; background-color: var(--background-default-grey); border-radius: 4px; } ::ng-deep .GPSearchBar { display: flex !important; padding: unset !important; }']
})
export class SearchComponent implements OnInit {
  private elementRef = inject(ElementRef);

  @Input() map!: Map;
  search!: Control;
  dialog!: Control;

  ngOnInit() {

    // Ajout du panel de recherche
    this.dialog = new Searchdialog({
        position: "top-left",
        panel: true,
        markerUrl: "assets/images/marker.png"
    });
    this.map.addControl(this.dialog);

    // Ajout de l'outil de recherche dans le panel
    /*this.search = new SearchEngine({
      displayButtonClose: false,
      displayButtonAdvancedSearch: false,
      displayButtonGeolocate: true,
      collapsible: true,
      splitResults: false,
      markerStyle: 'turquoiseBlue',
      zoomTo: 'auto',
      resources : {
        geocode : ["StreetAddress", "PositionOfInterest"],
        autocomplete : ["PositionOfInterest"],
        search: false
      },
      autocompleteOptions:{
        serviceOptions: {
          filterOptions: {
            type: "commune",
            poiType: "commune"
          }
        }
      }
    });   
    this.map.addControl(this.search);*/

    // extract geolocation button
    /*const geolocatebutton = document.querySelector('[id^=GPshowGeolocate-]');
    if(geolocatebutton){
      geolocatebutton.classList.add("gpf-widget", "gpf-widget-button", "fr-btn--tertiary", "geolocatebutton")
      geolocatebutton.classList.remove("fr-m-1w", "fr-btn--secondary");
      geolocatebutton.setAttribute('title', "Activer la géolocalisation");
    }*/
    //document.getElementById("position-container-bottom-right")?.appendChild(geolocatebutton);

    // const location = new LocationAdvancedSearch({})

    this.search = new SearchEngineAdvanced({
      advancedSearch : false,
      returnTrueGeometry : true,
    })

    this.map.addControl(this.search);

    // move searchEngine
    const searchinput = document.querySelector('[id^=GPsearchEngine-Advanced-]');
    // @ts-expect-error The search input element is not recognized by TypeScript, but it exists in the DOM.
    document.getElementById("searchmodal")?.appendChild(searchinput);
  }
}
