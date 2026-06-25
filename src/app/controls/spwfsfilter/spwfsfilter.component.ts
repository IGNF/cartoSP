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
                "Point d'accueil numérique (Préfecture et Sous-préfecture)",
                "Préfecture",
                "Sous-préfecture"
            ]
        },
        "Santé" : {
            markerPath: "assets/images/mapmarker/sante/",
            topologies: [
                "Centre de Santé",
                "Centre hospitalier (CH)",
                "Centre hospitalier régional (CHR)",
                "Centre hospitalier universitaire (CHU)",
                "France Santé",
                "Maison de santé"        
            ]
        },
        "Social" : {
            markerPath: "assets/images/mapmarker/social/",
            topologies: [
                "Caisse commune de sécurité sociale (CCSS)",
                "Caisse d'allocations familiales (Caf)",
                "Caisse d'assurance retraite et de la santé au travail (Carsat)",
                "Caisse primaire d’assurance maladie (CPAM)",
                "Centre communal d'action sociale (CCAS)",
                "Centre local information coordination P.A (Clic)",
                "Centre social",
                "Maison départementale des personnes handicapées (MDPH)",
                "Maison départementale des solidarités (MDS)",
                "Mutualité sociale agricole (MSA)",
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
                "Service de gestion comptable ou trésorerie",
                "Service départemental des impôts foncier (SDIF)",
                "Service des impôts des entreprises (SIE)",
                "Service des impôts des particuliers (SIP)"
            ]
        },
        "Droit, justice": {
            markerPath: "assets/images/mapmarker/droit-justice/",
            topologies: [
                "Bureau d'aide aux victimes du tribunal judiciaire",
                "Maison de justice",
                "Point-justice",
                "Tribunal de proximité",
                "Tribunal judiciaire"

            ]
        },
        "Environnement, logement, transports":  {
            markerPath: "assets/images/mapmarker/environnement/",
            topologies: [
                "Agence départementale d'information sur le logement (Adil)",
                "Agence nationale de l'habitat (ANAH) - réseau local",
                "Espace conseil France rénov'"
            ]
        },
        "Sécurité, défense":  {
            markerPath: "assets/images/mapmarker/securite/",
            topologies: [
                "Brigade de gendarmerie",
                "Commissariat de police"
            ]
        },
        "Enseignement": {
            markerPath: "assets/images/mapmarker/enseignement/",
            topologies: [
                "Collège",
                "Direction de services départementaux de l'Éducation nationale (Dsden) ",
                "École maternelle",
                "École primaire",
                "Lycée",
                "Rectorat"
            ]
        }
    };

    this.control = new WfsFilter({
      position: "top-left",
      panel: true,
      cartospLayerName: "IGNF_CARTO-SP_SERVICES-PUBLICS:__infos",
      cartospThemesInfo: ThemesInfo,
      collapsed: false,
    });

    this.map.addControl(this.control);
  }
}
