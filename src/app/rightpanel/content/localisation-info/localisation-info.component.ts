import { Component, Input, OnInit } from '@angular/core';

import { RightpanelService } from '../../rightpanel.service';
import { ApicartospService } from './../../../services/apicartosp.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';
import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-localisation-info',
  standalone: true,
  imports: [DsfrButtonModule, DsfrTabsModule, DsfrAccordionModule],
  templateUrl: './localisation-info.component.html',
  styleUrl: './localisation-info.component.css',
  providers: [ApicartospService]
})
export class LocalisationInfoComponent implements OnInit {

  constructor(private rightpanelService: RightpanelService, private apicartospService: ApicartospService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  apidata = {
    code: null,
    libelle: null,
    population_recensement: null,
    population_evolution: null,
    population_densite: null,
    vieillissement_indice: null,
    taux_chomage: null,
    mediane_revenu: null,
    population_rsa: null,
    population_part_rsa: null,
    taux_pauvrete: null,
    nb_qpv: null,
    population_municipale_total_qpv: null,
    population_resident_qpv: null,
    nb_commune: null,
    nb_epci: null
  };
  moynat = {
    departement: {
      population_recensement: "674080,52",
      population_evolution: null,
      taux_evolution: "0,17",
      population_densite: "552,63",
      vieillissement_indice: "101,89",
      taux_chomage: "12,16",
      mediane_revenu: "21966,63",
      population_rsa: "18388,81",
      population_part_rsa: "44,01",
      taux_pauvrete: "14,68",
      nb_qpv: "14,19",
      population_municipale_total_qpv: "55285,99",
      population_resident_qpv: "6,12"     
    },
    epci: {
      population_recensement: "53921,33",
      population_evolution: null,
      taux_evolution: "0,09",
      population_densite: "156,20",
      vieillissement_indice: "112,78",
      taux_chomage: "10,85",
      mediane_revenu: "22054,88",
      population_rsa: "1375,03",
      population_part_rsa: "33,30",
      taux_pauvrete: "13,20",
      nb_qpv: null,
      population_municipale_total_qpv: null,
      population_resident_qpv: null
    },
    commune: {
      population_recensement: "1930,47",
      population_evolution: null,
      taux_evolution: "0,03",
      population_densite: "165,98",
      vieillissement_indice: "124,59",
      taux_chomage: "9,49",
      population_rsa: "49,51",
      population_part_rsa: "22,50",
      taux_pauvrete: null,
      nb_qpv: null,
      population_municipale_total_qpv: null,
      population_resident_qpv: null
    }
  }

  ngOnInit(): void {
    if (this.data.type == "departement") {
      this.apicartospService.getDepartementInfos(this.data.location.number).subscribe({
        next : (response: any) => {
          this.fillDataValues(response);
        },
        error : (error: any) => { console.error('Error fetching departement info:', error) }
      });
    } else if (this.data.type == "epci") {
      this.apicartospService.getEpciInfos(this.data.location.number).subscribe({
        next : (response: any) => {
          this.fillDataValues(response);
        },
        error : (error: any) => { console.error('Error fetching epci info:', error) }
      });
    } else {
      this.apicartospService.getCommuneInfos(this.data.location.number).subscribe({
        next : (response: any) => {
          this.fillDataValues(response);
        },
        error : (error: any) => { console.error('Error fetching commune info:', error) }
      });
    }
  }

  fillDataValues(response: any) {
    this.apidata = {
      code: response.code,
      libelle: response.libelle,
      population_recensement: response.population_recensement,
      population_evolution: response.population_evolution,
      population_densite: response.population_densite,
      vieillissement_indice: response.vieillissement_indice,
      taux_chomage: response.taux_chomage,
      mediane_revenu: response.mediane_revenu,
      population_rsa: response.population_rsa,
      population_part_rsa: response.population_part_rsa,
      taux_pauvrete: response.taux_pauvrete,
      nb_qpv: response.nb_qpv,
      population_municipale_total_qpv: response.population_municipale_total_qpv,
      population_resident_qpv: response.population_resident_qpv,
      nb_commune: response.nb_commune,
      nb_epci: response.nb_epci
    };
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }
}
