import { Component, Input, LOCALE_ID, OnInit, inject } from '@angular/core';

import { RightpanelService } from '../../rightpanel.service';
import { ApicartospService } from './../../../services/apicartosp.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';
import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule, DsfrFormSelectModule } from '@edugouvfr/ngx-dsfr';
import { HttpParams } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-localisation-info',
  standalone: true,
  imports: [DsfrButtonModule, DsfrTabsModule, DsfrAccordionModule, DsfrFormSelectModule],
  templateUrl: './localisation-info.component.html',
  styleUrl: './localisation-info.component.css',
  providers: [ApicartospService,DecimalPipe,{provide: LOCALE_ID, useValue: "fr-Fr"}]
})
export class LocalisationInfoComponent implements OnInit {

  constructor(private rightpanelService: RightpanelService, private apicartospService: ApicartospService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  nbimplantations?: number;
  nbitinerants?: number;
  nbpermanences?: number;
  isochrones: any[] = [];
  private decimalPipe = inject(DecimalPipe);
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
      population_evolution: "0,3",
      taux_evolution: "0,17",
      population_densite: "106,5",
      vieillissement_indice: "86",
      taux_chomage: "7,3",
      mediane_revenu: "21966,63",
      population_rsa: "18388,81",
      population_part_rsa: "44,01",
      taux_pauvrete: "14,4",
      nb_qpv: "14,19",
      population_municipale_total_qpv: "55 285,99",
      population_resident_qpv: "6,12"     
    },
    epci: {
      population_recensement: "53921,33",
      population_evolution: "0,3",
      taux_evolution: "0,09",
      population_densite: "106,5",
      vieillissement_indice: "86",
      taux_chomage: null,
      mediane_revenu: "22054,88",
      population_rsa: "1375,03",
      population_part_rsa: "33,30",
      taux_pauvrete: "14,4",
      nb_qpv: null,
      population_municipale_total_qpv: null,
      population_resident_qpv: null
    },
    commune: {
      population_recensement: "1930,47",
      population_evolution: "0,3",
      taux_evolution: "0,03",
      population_densite: "106,5",
      vieillissement_indice: "86",
      taux_chomage: null,
      population_rsa: "49,51",
      population_part_rsa: "22,50",
      taux_pauvrete: "14,4",
      nb_qpv: null,
      population_municipale_total_qpv: null,
      population_resident_qpv: null
    }
  }
  selectSpList = [
    {label: "Tous les services publics", value: 'tous'},
    {label: "Administration locale", options: [
      {label: "Conseil départemental", value: "Conseil départemental"}, 
      {label: "France services", value: "France services"}, 
      {label: "Mairie", value: "Mairie"}, 
      {label: "Maison départementale des solidarités (MDS)", value: "Maison départementale des solidarités (MDS)"}, 
      {label: "Point d'accueil numérique (Préfecture et Sous-préfecture)", value: "Point d'accueil numérique (Préfecture et Sous-préfecture)"},
      {label: "Préfecture", value: "Préfecture"}, 
      {label: "Sous-préfecture", value: "Sous-préfecture"}
    ]},
    {label: "Social, santé", options: [
      {label: "Caisse commune de Sécurité sociale (CCSS)", value: "Caisse commune de Sécurité sociale (CCSS)"},
      {label: "Caisse d'allocations familiales (Caf)", value: "Caisse d'allocations familiales (Caf)"},
      {label: "Caisse d'assurance retraite et de la santé au travail (Carsat)", value: "Caisse d'assurance retraite et de la santé au travail (Carsat)"},
      {label: "Caisse primaire d'assurance maladie (CPAM)", value: "Caisse primaire d'assurance maladie (CPAM)"},
      {label: "Centre communal d'action sociale (CCAS)", value: "Centre communal d'action sociale (CCAS)"},
      {label: "Centre de Santé", value: "Centre de Santé"},
      {label: "Centre Hospitalier (C.H.)", value: "Centre Hospitalier (C.H.)"},
      {label: "Centre Hospitalier Régional (C.H.R.)", value: "Centre Hospitalier Régional (C.H.R.)"},
      {label: "Centre hospitalier universitaire (CHU)", value: "Centre hospitalier universitaire (CHU)"},
      {label: "Centres Locaux Information Coordination P.A .(C.L.I.C.)", value: "Centres Locaux Information Coordination P.A .(C.L.I.C.)"},
      {label: "Centres sociaux", value: "Centres sociaux"},
      {label: "Communautés professionnelles territoriales de santé (CPTS)", value: "Communautés professionnelles territoriales de santé (CPTS)"},
      {label: "Maison départementale des personnes handicapées (MDPH)", value: "Maison départementale des personnes handicapées (MDPH)"},
      {label: "Mutualité sociale agricole (MSA)", value: "Mutualité sociale agricole (MSA)"},
      {label: "Service d’aide médicale urgente (Samu)", value: "Service d’aide médicale urgente (Samu)"},
      {label: "Union de recouvrement des cotisations de sécurité sociale et d’allocations familiales (Urssaf)", value: "Union de recouvrement des cotisations de sécurité sociale et d’allocations familiales (Urssaf)"}
    ]}, 
    {label: "Travail, emploi, formation", options: [
      {label: "France Travail", value: "France Travail"}, 
      {label: "Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans)", value: "Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans)"}
    ]},
    {label: "Economie, finances, consommation", options: [
      {label: "Direction départementale des finances publiques (DDFIP)", value: "Direction départementale des finances publiques (DDFIP)"}, 
      {label: "Service des impôts des entreprises (SIE)", value: "Service des impôts des entreprises (SIE)"}, 
      {label: "Service des impôts des particuliers (SIP)", value: "Service des impôts des particuliers (SIP)"},
      {label: "Trésorerie", value: "Trésorerie"}
    ]},
    {label: "Droit, justice", options: [
      {label: "Bureau d'aide aux victimes du tribunal judiciaire", value: "Bureau d'aide aux victimes du tribunal judiciaire"},
      {label: "Conseil départemental d'accès au droit (CDAD)", value: "Conseil départemental d'accès au droit (CDAD)"}, 
      {label: "Point-justice", value: "Point-justice"}, 
      {label: "Tribunal judiciaire", value: "Tribunal judiciaire"}
    ]},
    {label: "Environnement, logement, transports", options: [
      {label: "Agence départementale d'information sur le logement (Adil)", value: "Agence départementale d'information sur le logement (Adil)"}, 
      {label: "Agence nationale de l’habitat (ANAH)", value: "Agence nationale de l’habitat (ANAH)"},
      {label: "Espace conseil France rénov'", value: "Espace conseil France rénov'"}
    ]},
    {label: "Sécurité, défense", options: [
      {label: "Brigade de gendarmerie", value: "Brigade de gendarmerie"}, 
      {label: "Commissariat de police", value: "Commissariat de police"}
    ]},
  ];

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
          console.log(response);
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
    this.selectSpChange("tous");
    this.updateIsochroneDatas();
    if(this.data.isochronecall){
      this.selectedTabIndex = 2;
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

  selectSpChange(e: any){
    var options = {};
    var optionsPerma = {};

    if(e != "tous"){
      options = Object.assign(options, {service_typologie: e});
      optionsPerma = Object.assign(optionsPerma, {permanence_typologie: e});
    }
    
    if (this.data.type == "departement") {
      options = Object.assign(options, {lieu_code_departement: this.data.location.number});
      optionsPerma = Object.assign(optionsPerma, {lieu_code_departement: this.data.location.number});
    } else if (this.data.type == "epci") {
      options = Object.assign(options, {lieu_code_epci: this.data.location.number});
      optionsPerma = Object.assign(optionsPerma, {lieu_code_epci: this.data.location.number});
    } else {
      options = Object.assign(options, {lieu_code_insee: this.data.location.number});
      optionsPerma = Object.assign(optionsPerma, {lieu_code_insee: this.data.location.number});
    }

    this.apicartospService.getTypeCount(Object.assign(options, {type_structure: "Implantation"})).subscribe({
      next : (response: any) => {
        this.nbimplantations = response;
      },
      error : (error: any) => { console.error('Error fetching Implantation count info:', error) }
    });

    this.apicartospService.getTypeCount(Object.assign(optionsPerma, {type_structure: "Permanence"})).subscribe({
      next : (response: any) => {
        this.nbpermanences = response;
      },
      error : (error: any) => { console.error('Error fetching Permanence count info:', error) }
    });

    this.apicartospService.getTypeCount(Object.assign(options, {type_structure: "Itinérance"})).subscribe({
      next : (response: any) => {
        this.nbitinerants = response;
      },
      error : (error: any) => { console.error('Error fetching Itinérant count info:', error) }
    });
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }

  updateIsochroneDatas(){
    this.isochrones = [];
    this.data.map.getAllLayers().forEach((layer: { values_: {layername: string; location: string; name_location: string; ride: string; time: string; }; }) => {
      if(layer.values_.layername && layer.values_.location === this.data.location.number){
        this.apicartospService.getIsochroneData({nom_iso: layer.values_.layername, num_dep: layer.values_.location }).subscribe({
          next : (response: any) => {
            this.isochrones.push({layername: layer.values_.layername, location: layer.values_.location, name_location: layer.values_.name_location, ride: layer.values_.ride, time: layer.values_.time, datas: response});
          },
          error : (error: any) => { console.error('Error fetching Itinérant count info:', error) }
        });
      }
    });
  }

  formatNumber(value: any, format: string): string | null {
    if(value){
      return this.decimalPipe.transform(value.replace(',','.'), format);
    } else {
      return "Inconnue";
    }
  }
}
