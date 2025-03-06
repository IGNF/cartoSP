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
              "France services",
                "Mairie",
                "Point d'accueil numérique (Préfecture et Sous-préfecture)",
                "Préfecture",
                "Sous-préfecture"
            ]
        },
        "Droit, justice": {
            markerPath: "assets/images/mapmarker/droit-justice/",
            topologies: [
                "Conseil départemental d'accès au droit (CDAD)",
                "Point-justice - France services ou relais d'accès au droit",
                "Point-justice - Maison de la justice et du droit",
                "Tribunal judiciaire"
            ]
        },
        "Economie, finances, consommation" : {
            markerPath: "assets/images/mapmarker/finance/",
            topologies: [
                "Trésorerie",
                "Service des impôts des entreprises (SIE)",
                "Service des impôts des particuliers (SIP)"
            ]
        },
        "Social, santé" : {
            markerPath: "assets/images/mapmarker/social-sante/",
            topologies: [
                "Maison de santé (L.6223-3)",
                "Service d’aide médicale urgente (Samu)",
                "Centre de Santé",
                "Centres Locaux Information Coordination P.A .(C.L.I.C.)",
                "Caisse d'allocations familiales (Caf)",
                "Caisse d'assurance retraite et de la santé au travail (Carsat)",
                "Caisse primaire d’assurance maladie (CPAM)",
                "Centre Hospitalier (C.H.)",
                "Centre Hospitalier Régional (C.H.R.)",
                "Centre hospitalier universitaire (CHU)",
                "Centres sociaux",
                "Maison départementale des personnes handicapées (MDPH)",
                "Mutualité sociale agricole (MSA), réseau local",
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
        "Environnement, logement, transports":  {
            markerPath: "assets/images/mapmarker/environnement/",
            topologies: [
                "Agence départementale d'information sur le logement (Adil)",
                "Agence nationale de l’habitat (ANAH) - réseau local",
                "Bureau d'aide aux victimes du tribunal judiciaire",
                "Espace conseil France rénov'"
            ]
    }};

    this.control = new WfsFilter({
      position: "top-left",
      panel: true,
      cartospLayerName: "services_publics_test_20250304:carto_sp_interne",
      cartospThemesInfo: ThemesInfo
    });

    this.map.addControl(this.control);
  }
}
