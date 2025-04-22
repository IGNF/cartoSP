import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { WfsFilter } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-spwfsfilter',
  standalone: true,
  imports: [],
  template: '',
  styles: []
})
export class SpwfsfilterComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    var ThemesInfo = {
        "Administration locale": {
            markerPath: "assets/images/mapmarker/administrations-locales/",
            topologies: [
                "Conseil départemental",
                "France services",
                "Mairie",
                "Maison départementale des solidarités (MDS)",
                "Point d'accueil numérique (Préfecture et Sous-préfecture)",
                "Préfecture",
                "Sous-préfecture",
            ]
        },
        "Social, santé" : {
            markerPath: "assets/images/mapmarker/social-sante/",
            topologies: [
                "Caisse commune de Sécurité sociale (CCSS)",
                "Caisse d'allocations familiales (Caf)",
                "Caisse d'assurance retraite et de la santé au travail (Carsat)",
                "Caisse primaire d'assurance maladie (CPAM)",
                "Centre communal d'action sociale (CCAS)",
                "Centre de Santé",
                "Centre Hospitalier (C.H.)",
                "Centre Hospitalier Régional (C.H.R.)",
                "Centre hospitalier universitaire (CHU)",
                "Centres Locaux Information Coordination P.A .(C.L.I.C.)",
                "Centres sociaux",
                "Communautés professionnelles territoriales de santé (CPTS)",
                "Maison départementale des personnes handicapées (MDPH)",
                "Maisons des solidarités et antennes",
                "Mutualité sociale agricole (MSA)",
                "Service d’aide médicale urgente (Samu)",
                "Union de recouvrement des cotisations de sécurité sociale et d’allocations familiales (Urssaf)"                  
            ]
        },
        "Travail, emploi, formation": {
            markerPath: "assets/images/mapmarker/emploi-formation/",
            topologies: [
                "France Travail",
                "Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans)"
            ]
        },
        "Economie, finances, consommation" : {
            markerPath: "assets/images/mapmarker/finance/",
            topologies: [
                "Direction départementale des finances publiques (DDFIP)",
                "Service des impôts des entreprises (SIE)",
                "Service des impôts des particuliers (SIP)",
                "Trésorerie"
            ]
        },
        "Droit, justice": {
            markerPath: "assets/images/mapmarker/droit-justice/",
            topologies: [
                "Conseil départemental d'accès au droit (CDAD)",
                "Point-justice",
                "Tribunal judiciaire"
            ]
        },
        "Environnement, logement, transports":  {
            markerPath: "assets/images/mapmarker/environnement/",
            topologies: [
                "Agence départementale d'information sur le logement (Adil)",
                "Agence nationale de l'habitat (ANAH)",
                "Bureau d'aide aux victimes du tribunal judiciaire",
                "Espace conseil France rénov'"
            ]
        },
        "Sécurité, défense":  {
            markerPath: "assets/images/mapmarker/securite/",
            topologies: [
                "Brigade de gendarmerie",
                "Commissariat de police",
                "Police municipale"
            ]
        }
    };

    this.control = new WfsFilter({
      position: "top-left",
      panel: true,
      cartospLayerName: "services_publics_test_20250331_v2:carto_sp_interne",
      cartospThemesInfo: ThemesInfo
    });

    this.map.addControl(this.control);
  }
}
