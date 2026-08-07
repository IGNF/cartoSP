import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Indicator } from "geopf-extensions-openlayers/src";

@Component({
    selector: 'app-indicatorselector',
    imports: [],
    template: '',
    styles: []
})
export class IndicatorselectorComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
      // Liste des indicateurs
      var indicateurs = [
        {
            thematique: "Démographie",
            indicators: [
                {title:"Densité de population", layername: "IGNF_CARTO-SP_DENSITE-POPULATION-CARREAU__VALID", opacity: 1},
                {title:"Part des plus de 65 ans", layername: "IGNF_CARTO-SP_PART-PLUS-65ANS__VALID", opacity: 1},
                {title:"Part des moins de 18 ans", layername: "IGNF_CARTO-SP_PART-MOINS-18ANS__VALID", opacity: 1},
            ]
        },
        {
            thematique: "Précarité",
            indicators: [
                {title:"Part des ménages pauvres", layername: "IGNF_CARTO-SP_PART-MENAGES-PAUVRES__VALID", opacity: 1},
                //{title:"Niveau de vie moyen", layername: "total_pilotes_insee_niveau_de_vie", opacity: 1},
            ]
        },
        {
            thematique: "Fragilité numérique",
            indicators: [
                {title:"Indicateur de fragilité numérique", layername: "IGNF_CARTO-SP_INDICATEUR-FRAGILITE-NUMERIQUE__VALID", opacity: 1, getFeatureInfo: true},
            ]
        },
        {
            thematique: "Zonage",
            indicators: [
                {title:"Bassin de vie", layername: "IGNF_CARTO-SP_BASSINS-VIE__VALID", opacity: 1},
                {title:"Quartiers prioritaires de la ville", layername: "IGNF_CARTO-SP_QUARTIERS-PRIORITAIRES-VILLE", opacity: 1, getFeatureInfo: true},
            ]
        },
        {
            thematique: "Santé et accès aux soins",
            indicators: [
                // {title:"Professionnels de premier recours", layername: ""}, // sous-theme
                {title:"Médecins généralistes", layername: "IGNF_CARTO-SP_PPR_MEDECINS__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Infirmiers", layername: "IGNF_CARTO-SP_PPR_INFIRMIERS__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Kinésithérapeutes", layername: "IGNF_CARTO-SP_PPR_KINESITHERAPEUTES__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Chirurgiens-dentistes", layername: "IGNF_CARTO-SP_PPR_DENTISTES__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Orthophonistes", layername: "IGNF_CARTO-SP_PPR_ORTHOPHONISTES__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Sages-femmes", layername: "IGNF_CARTO-SP_PPR_SAGES_FEMMES__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Territoire", layername: ""}, // sous-theme
                {title:"Densité médicale", layername: "IGNF_CARTO-SP_DENSITE-MEDECINS__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Moyenne d'âge des médecins", layername: "IGNF_CARTO-SP_MOYENNE-AGE-MEDECINS__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Accessibilité aux soins de premier recours", layername: "IGNF_CARTO-SP_ACCESSIBILITE-SOINS-PREMIER-RECOURS__VALID", opacity: 1, getFeatureInfo: true},
                {title:"Zonage CPTS", layername: "IGNF_CARTO-SP_ZONAGE-CPTS", opacity: 1, getFeatureInfo: true},
            ]
        }
    ];

    this.control = new Indicator({
      position: "top-left",
      panel: true,
      indicatorList: indicateurs
    });

    this.map.addControl(this.control);
  }
}
