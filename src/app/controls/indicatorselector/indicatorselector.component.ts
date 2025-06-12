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
                {title:"Fréquentation des implantations", layername: "frequentation_SP_v3", opacity: 0.7},
                {title:"Fréquentation des permanences", layername: "frequentation_SP_permanences", opacity: 0.7},
            ]
        },
        {
            thematique: "Démographie",
            indicators: [
                {title:"Densité de population", layername: "total_pilotes_insee_densite_population", opacity: 1},
                {title:"Part des plus de 65 ans", layername: "total_pilotes_insee_partplus65", opacity: 1},
                {title:"Part des moins de 18 ans", layername: "total_pilotes_insee_partmoins18", opacity: 1},
            ]
        },
        {
            thematique: "Précarité",
            indicators: [
                {title:"Part des ménages pauvres", layername: "total_pilotes_insee_menages_pauvres", opacity: 1},
                {title:"Niveau de vie moyen", layername: "total_pilotes_insee_niveau_de_vie", opacity: 1},
            ]
        },
        {
            thematique: "Inclusion numérique",
            indicators: [
                {title:"Indicateur de fragilité numérique", layername: "total_pilotes_mednum_fragilite_numerique_2", opacity: 1},
            ]
        },
        {
            thematique: "Zonage",
            indicators: [
                {title:"Bassin de vie", layername: "bassins_de_vie_france", opacity: 1},
                {title:"Quartiers prioritaires de la ville", layername: "ANCT_QPV_wms", opacity: 1},
            ]
        },
        {
            thematique: "Santé et accès aux soins",
            indicators: [
                {title:"Professionnels de premier recours", layername: ""}, // sous-theme
                {title:"Médecins généralistes", layername: "total_sante_nb_generalistes", opacity: 1},
                {title:"Infirmiers", layername: "total_sante_nb_infirmiers", opacity: 1},
                {title:"Kinésithérapeutes", layername: "total_sante_nb_kines", opacity: 1},
                {title:"Chirurgiens-dentistes", layername: "total_sante_nb_dentistes", opacity: 1},
                {title:"Orthophonistes", layername: "total_sante_nb_orthophonistes", opacity: 1},
                {title:"Sages-femmes", layername: "total_sante_nb_sagesfemmes", opacity: 1},
                {title:"Territoire", layername: ""}, // sous-theme
                {title:"Densité médicale", layername: "total_sante_densite_medicale", opacity: 1},
                {title:"Moyenne d'âge des médecins", layername: "total_sante_moyenne_age_medecin", opacity: 1},
                {title:"Accessibilité aux soins de premier recours", layername: "total_sante_accessibilite", opacity: 1},
                {title:"Zonage CPTS", layername: "cpts_20250513", opacity: 1},
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
