import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Territories } from "geopf-extensions-openlayers/src";
import { RightpanelService } from '../../../app/rightpanel/rightpanel.service';

@Component({
  selector: 'app-territoire',
  standalone: true,
  template: '',
  styleUrl: './territoire.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class TerritoireComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  territoriesList = [
    {
      id: "FMP",
      title: "France métropolitaine",
      bbox: [-5.2, 41.3, 9.8, 51.2],
      description: "France métropolitaine",
      icon: "assets/images/locations/Illustration_France.svg",
    },
    {
      id: "ARA",
      title: "Auvergne-Rhône-Alpes",
      bbox: [2.0, 44.1, 7.3, 46.8],
      description: "Auvergne-Rhône-Alpes",
      icon: "assets/images/locations/Illustration_AuvergneRhoneAlpes.svg",
    },
    {
      id: "BFC",
      title: "Bourgogne-Franche-Comté",
      bbox: [2.9, 46.1, 7.2, 48.4],
      description: "Bourgogne-Franche-Comté",
      icon: "assets/images/locations/Illustration_BourgogneFrancheComte.svg",
    },    
    {
      id: "BRE",
      title: "Bretagne",
      bbox: [-5.2, 47.2, -1.0, 48.9],
      description: "Bretagne",
      icon: "assets/images/locations/Illustration_Bretagne.svg",
    },    
    {
      id: "CVL",
      title: "Centre-Val de Loire",
      bbox: [0.2, 46.3, 3.1, 48.9],
      description: "Centre-Val de Loire",
      icon: "assets/images/locations/Illustration_CentreValDeLoire.svg",
    },    
    {
      id: "COR",
      title: "Corse",
      bbox: [8.5, 41.3, 9.6, 43.1],
      description: "Corse",
      icon: "assets/images/locations/Illustration_Corse.svg",
    },    
    {
      id: "GES",
      title: "Grand Est",
      bbox: [3.4, 47.4, 8.3, 50.2],
      description: "Grand Est",
      icon: "assets/images/locations/Illustration_GrandEst.svg",
    },    
    {
      id: "GUA",
      title: "Guadeloupe",
      bbox: [-61.9, 15.8, -60.9, 16.6],
      description: "Guadeloupe",
      icon: "assets/images/locations/Illustration_Guadeloupe.svg",
    },    
    {
      id: "GUY",
      title: "Guyane",
      bbox: [-54.7, 2.1, -51.5, 5.9],
      description: "Guyane",
      icon: "assets/images/locations/Illustration_Guyane.svg",
    },    
    {
      id: "HDF",
      title: "Hauts-de-France",
      bbox: [1.5, 49.4, 4.3, 51.1],
      description: "Hauts-de-France",
      icon: "assets/images/locations/Illustration_HautsDeFrance.svg",
    },
    {
      id: "IDF",
      title: "Île-de-France",
      bbox: [1.45, 48.12, 3.56, 49.24],
      description: "Île-de-France",
      icon: "assets/images/locations/Illustration_IledeFrance.svg",
    },
    {
      id: "REU",
      title: "La Réunion",
      bbox: [55.2, -21.4, 55.9, -20.8],
      description: "La Réunion",
      icon: "assets/images/locations/Illustration_Reunion.svg",
    },
    {
      id: "MTQ",
      title: "Martinique",
      bbox: [-61.3, 14.35, -60.8, 14.9],
      description: "Martinique",
      icon: "assets/images/locations/Illustration_Martinique.svg",
    },
    {
      id: "MYT",
      title: "Mayotte",
      bbox: [45.0, -13.05, 45.35, -12.6],
      description: "Mayotte",
      icon: "assets/images/locations/Illustration_Mayotte.svg",
    },
    {
      id: "NOR",
      title: "Normandie",
      bbox: [-2.0, 48.2, 1.9, 50.1],
      description: "Normandie",
      icon: "assets/images/locations/Illustration_Normandie.svg",
    },
    {
      id: "NAQ",
      title: "Nouvelle-Aquitaine",
      bbox: [-1.9, 42.8, 1.9, 47.4],
      description: "Nouvelle-Aquitaine",
      icon: "assets/images/locations/Illustration_NouvelleAquitaine.svg",
    },
    {
      id: "OCC",
      title: "Occitanie",
      bbox: [-0.3, 42.3, 4.9, 45.1],
      description: "Occitanie",
      icon: "assets/images/locations/Illustration_Occitanie.svg",
    },
    {
      id: "PDL",
      title: "Pays de la Loire",
      bbox: [-2.6, 46.2, 0.9, 47.9],
      description: "Pays de la Loire",
      icon: "assets/images/locations/Illustration_PaysDelaLoire.svg",
    },
    {
      id: "PAC",
      title: "Provence-Alpes-Côte d'Azur",
      bbox: [4.2, 42.9, 7.8, 45.2],
      description: "Provence-Alpes-Côte d'Azur",
      icon: "assets/images/locations/Illustration_ProvenceAlpesCoteDAzur.svg",
    }
  ];

  constructor(private elementRef: ElementRef, private rightpanelService: RightpanelService) {}

  ngOnInit() {
    this.control = new Territories({
      position : "bottom-left",
      thumbnail: false,
      reduce: false,
      tiles: 0,
      id: "territoires",
      view : {
          active : true,
          title : "Modifier les territoires",
          description : "Modifier la vue"
      },
      territories: this.territoriesList
    });

    this.map.addControl(this.control);
    this.rightpanelService.setTerritoriesControl(this.control);
    this.rightpanelService.territoryControl.element.firstChild.firstChild.textContent = "Zoomer sur un territoire";
    this.rightpanelService.territoryControl.element.firstChild.classList.remove('gpf-btn-icon', 'gpf-btn-icon-territories');
    this.rightpanelService.territoryControl.element.firstChild.classList.add('fr-icon-france-line');
  }
}
