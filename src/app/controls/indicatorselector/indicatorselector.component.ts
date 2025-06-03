import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Indicator } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-indicatorselector',
  standalone: true,
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
            thematique: "Services publics",
            indicators: [
                {title:"Fréquentation des implantations", layername: "frequentation_SP_v3"},
                {title:"Fréquentation des permanences", layername: "frequentation_SP_permanences"},
            ]
        },
        {
            thematique: "Démographie",
            indicators: [
                {title:"Densité de population", layername: "total_pilotes_insee_densite_population"},
                {title:"Part des plus de 65 ans", layername: "total_pilotes_insee_partplus65"},
                {title:"Part des moins de 18 ans", layername: "total_pilotes_insee_partmoins18"},
            ]
        },
        {
            thematique: "Précarité",
            indicators: [
                {title:"Part des ménages pauvres", layername: "total_pilotes_insee_menages_pauvres"},
                {title:"Niveau de vie moyen", layername: "total_pilotes_insee_niveau_de_vie"},
            ]
        },
        {
            thematique: "Inclusion numérique",
            indicators: [
                {title:"Indicateur de fragilité numérique", layername: "total_pilotes_mednum_fragilite_numerique_2"},
            ]
        },
        {
            thematique: "Zonage",
            indicators: [
                {title:"Bassin de vie", layername: "bassins_de_vie_france"},
                {title:"Quartiers prioritaires de la ville", layername: "ANCT_QPV_wms"},
            ]
        },
        {
            thematique: "Santé et accès aux soins",
            indicators: [
                {title:"Professionnels de premier recours", layername: ""}, // sous-theme
                {title:"Médecins généralistes", layername: "total_sante_nb_generalistes"},
                {title:"Infirmiers", layername: "total_sante_nb_infirmiers"},
                {title:"Kinésithérapeutes", layername: "total_sante_nb_kines"},
                {title:"Chirurgiens-dentistes", layername: "total_sante_nb_dentistes"},
                {title:"Orthophonistes", layername: "total_sante_nb_orthophonistes"},
                {title:"Sages-femmes", layername: "total_sante_nb_sagesfemmes"},
                {title:"Territoire", layername: ""}, // sous-theme
                {title:"Densité médicale", layername: "total_sante_densite_medicale"},
                {title:"Moyenne d'âge des médecins", layername: "total_sante_moyenne_age_medecin"},
                {title:"Accessibilité aux soins de premier recours", layername: "total_sante_accessibilite"},
                {title:"Zonage CPTS", layername: "cpts_20250513"},
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
