import { Component, Input, LOCALE_ID, OnInit, OnDestroy, inject, NgZone, ChangeDetectorRef } from '@angular/core';

import { RightpanelService } from '../../rightpanel.service';
import { ApicartospService } from './../../../services/apicartosp.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';
import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule, DsfrFormSelectModule } from '@edugouvfr/ngx-dsfr';
import { HttpParams } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-localisation-info',
    imports: [DsfrButtonModule, DsfrTabsModule, DsfrAccordionModule, DsfrFormSelectModule],
    templateUrl: './localisation-info.component.html',
    styleUrl: './localisation-info.component.css',
    providers: [ApicartospService, DecimalPipe, { provide: LOCALE_ID, useValue: "fr-Fr" }]
})
export class LocalisationInfoComponent implements OnInit, OnDestroy {

  constructor(private rightpanelService: RightpanelService, private apicartospService: ApicartospService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  @Input() data!: any;
  private layerListeners: Array<{ layer: any; listener: any }> = [];
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  nbimplantations?: number;
  nbitinerants?: number;
  nbpermanences?: number;
  nbtotal?: number;
  spStatistiques?: any;
  isochrones: any[] = [];
  private decimalPipe = inject(DecimalPipe);
  apidata = {
    code: null,
    libelle: null,
    nb_commune: null,
    nb_epci: null,
    population_densite: null,
    population_recensement: null,
    projection2070: null,
    vieillissement_indice: null,
    projection_vieillissement2070: null,
    taux_pauvrete: null,
    taux_chomage: null,
    population_rsa: null,
    nb_monoparentale: null,
    nb_qpv: null
  };
  moynat = {
    type: null,
    count: null,
    population_recensement_moyenne: null,
    population_rsa_moyenne: null,
    nb_epci_moyenne: null,
    nb_qpv_moyenne: null,
    nb_commune_moyenne: null,
    nb_monoparentale_moyenne: null,
    projection2070_moyenne: null,
    densite_pop_valnat: null,
    evolution_an_pop_valnat: null,
    chomage_bit_valnat: null,
    indice_vieillissement_valnat: null,
    taux_pauvrete_moyenne: null,
    indice_vieillissement2070_valnat: null
  }
  selectSpList = [
    {label: "Tous les services publics", value: 'tous'},
    {label: "Administration locale", options: [
      {label: "Conseil départemental", value: "Conseil départemental"}, 
      {label: "France services", value: "France services"}, 
      {label: "Mairie", value: "Mairie"},
      {label: "Point d'accueil numérique (Préfecture et Sous-préfecture)", value: "Point d'accueil numérique (Préfecture et Sous-préfecture)"}, 
      {label: "Préfecture", value: "Préfecture"}, 
      {label: "Sous-préfecture", value: "Sous-préfecture"}
    ]},
    {label: "Santé", options: [
      {label: "Centre de Santé", value: "Centre de Santé"},
      {label: "Centre hospitalier (CH)", value: "Centre hospitalier (CH)"},
      {label: "Centre hospitalier régional (CHR)", value: "Centre hospitalier régional (CHR)"},
      {label: "Centre hospitalier universitaire (CHU)", value: "Centre hospitalier universitaire (CHU)"},
      {label: "France Santé", value: "France Santé"},
      {label: "Maison de santé", value: "Maison de santé"}
    ]},
    {label: "Social", options: [
      {label: "Caisse d'allocations familiales (Caf)", value: "Caisse d'allocations familiales (Caf)"},
      {label: "Caisse d'assurance retraite et de la santé au travail (Carsat)", value: "Caisse d'assurance retraite et de la santé au travail (Carsat)"},
      {label: "Caisse primaire d’assurance maladie (CPAM)", value: "Caisse primaire d’assurance maladie (CPAM)"},
      {label: "Centre communal d'action sociale (CCAS)", value: "Centre communal d'action sociale (CCAS)"},
      {label: "Centre local information coordination P.A (Clic)", value: "Centre local information coordination P.A (Clic)"},
      {label: "Centre social", value: "Centre social"},
      {label: "Maison départementale des personnes handicapées (MDPH)", value: "Maison départementale des personnes handicapées (MDPH)"},
      {label: "Maison départementale des solidarités (MDS)", value: "Maison départementale des solidarités (MDS)"},
      {label: "Mutualité sociale agricole (MSA)", value: "Mutualité sociale agricole (MSA)"},
      {label: "Union de recouvrement des cotisations de sécurité sociale et d’allocations familiales (Urssaf)", value: "Union de recouvrement des cotisations de sécurité sociale et d’allocations familiales (Urssaf)"}
    ]}, 
    {label: "Travail, emploi, formation", options: [
      {label: "France Travail", value: "France Travail"}, 
      {label: "Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans)", value: "Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans)"}
    ]},
    {label: "Economie, finances, consommation", options: [
      {label: "Service de gestion comptable ou trésorerie", value: "Service de gestion comptable ou trésorerie"}, 
      {label: "Service départemental des impôts foncier (SDIF)", value: "Service départemental des impôts foncier (SDIF)"},
      {label: "Service des impôts des entreprises (SIE)", value: "Service des impôts des entreprises (SIE)"}, 
      {label: "Service des impôts des particuliers (SIP)", value: "Service des impôts des particuliers (SIP)"}
    ]},
    {label: "Droit, justice", options: [
      {label: "Bureau d'aide aux victimes du tribunal judiciaire", value: "Bureau d'aide aux victimes du tribunal judiciaire"},
      {label: "Maison de justice", value: "Maison de justice"},
      {label: "Point-justice", value: "Point-justice"}, 
      {label: "Tribunal de proximité", value: "Tribunal de proximité"},
      {label: "Tribunal judiciaire", value: "Tribunal judiciaire"}
    ]},
    {label: "Environnement, logement, transports", options: [
      {label: "Agence départementale d'information sur le logement (Adil)", value: "Agence départementale d'information sur le logement (Adil)"}, 
      {label: "Agence nationale de l'habitat (ANAH) - réseau local", value: "Agence nationale de l'habitat (ANAH) - réseau local"},
      {label: "Espace conseil France rénov'", value: "Espace conseil France rénov'"}
    ]},
    {label: "Sécurité, défense", options: [
      {label: "Brigade de gendarmerie", value: "Brigade de gendarmerie"}, 
      {label: "Commissariat de police", value: "Commissariat de police"}
    ]},
    {label: "Enseignement", options: [
      {label: "Collège", value: "Collège"},
      {label: "Direction de services départementaux de l'Éducation nationale (Dsden) ", value: "Direction de services départementaux de l'Éducation nationale (Dsden) "},
      {label: "École maternelle", value: "École maternelle"},
      {label: "École primaire", value: "École primaire"},
      {label: "Lycée", value: "Lycée"},
      {label: "Rectorat", value: "Rectorat"}
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
      this.apicartospService.getMoyennesInfo("departement").subscribe({
        next : (response: any) => {
          this.fillMoynatValues(response);
        },
        error : (error: any) => { console.error('Error fetching departement moyennes info:', error) }
      });
    } else if (this.data.type == "epci") {
      this.apicartospService.getEpciInfos(this.data.location.number).subscribe({
        next : (response: any) => {
          console.log(response);
          this.fillDataValues(response);
        },
        error : (error: any) => { console.error('Error fetching epci info:', error) }
      });
      this.apicartospService.getMoyennesInfo("epci").subscribe({
        next : (response: any) => {
          this.fillMoynatValues(response);
        },
        error : (error: any) => { console.error('Error fetching epci moyennes info:', error) }
      });
    } else {
      this.apicartospService.getCommuneInfos(this.data.location.number).subscribe({
        next : (response: any) => {
          this.fillDataValues(response);
        },
        error : (error: any) => { console.error('Error fetching commune info:', error) }
      });
      this.apicartospService.getMoyennesInfo("commune").subscribe({
        next : (response: any) => {
          this.fillMoynatValues(response);
        },
        error : (error: any) => { console.error('Error fetching commune moyennes info:', error) }
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
      nb_commune: response.nb_commune,
      nb_epci: response.nb_epci,
      population_densite: response.population_densite,
      population_recensement: response.population_recensement,
      projection2070: response.projection2070,
      vieillissement_indice: response.vieillissement_indice,
      projection_vieillissement2070: response.projection_vieillissement2070,
      taux_pauvrete: response.taux_pauvrete,
      taux_chomage: response.taux_chomage,
      population_rsa: response.population_rsa,
      nb_monoparentale: response.nb_monoparentale,
      nb_qpv: response.nb_qpv
    };
  }

  fillMoynatValues(response: any) {
    this.moynat = {
      type: response.type,
      count: response.count,
      population_recensement_moyenne: response.population_recensement_moyenne,
      population_rsa_moyenne: response.population_rsa_moyenne,
      nb_epci_moyenne: response.nb_epci_moyenne,
      nb_qpv_moyenne: response.nb_qpv_moyenne,
      nb_commune_moyenne: response.nb_commune_moyenne,
      nb_monoparentale_moyenne: response.nb_monoparentale_moyenne,
      projection2070_moyenne: response.projection2070_moyenne,
      densite_pop_valnat: response.densite_pop_valnat,
      evolution_an_pop_valnat: response.evolution_an_pop_valnat,
      chomage_bit_valnat: response.chomage_bit_valnat,
      indice_vieillissement_valnat: response.indice_vieillissement_valnat,
      taux_pauvrete_moyenne: response.taux_pauvrete_moyenne,
      indice_vieillissement2070_valnat: response.indice_vieillissement2070_valnat
    };
  }

  selectSpChange(e: any){
    var options = {};

    options = Object.assign(options, {typologie: e});
    
    if (this.data.type == "departement") {
      options = Object.assign(options, {code_dep: this.data.location.number});
    } else if (this.data.type == "epci") {
      options = Object.assign(options, {code_epci: this.data.location.number});
    } else {
      options = Object.assign(options, {code_insee: this.data.location.number});
    }

    var totalOptions = Object.assign({}, options);

    this.apicartospService.getTypeCount(Object.assign(options, {type_structure: "Implantation"})).subscribe({
      next : (response: any) => {
        this.nbimplantations = response;
      },
      error : (error: any) => { console.error('Error fetching Implantation count info:', error) }
    });

    this.apicartospService.getTypeCount(Object.assign(options, {type_structure: "Permanence"})).subscribe({
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

    this.apicartospService.getTypeCount(totalOptions).subscribe({
      next : (response: any) => {
        this.nbtotal = response;
      },
      error : (error: any) => { console.error('Error fetching total count info:', error) }
    });
    
    this.apicartospService.getSpStatistiques(totalOptions).subscribe({
      next : (response: any) => {
        this.spStatistiques = response;
      },
      error : (error: any) => { 
        this.spStatistiques = null;
        console.error('Error fetching SP statistiques info:', error)
       }
    });
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }

  updateIsochroneDatas(){
    this.layerListeners.forEach(({ layer, listener }) => layer.un('propertychange', listener));
    this.layerListeners = [];
    this.isochrones = [];
    this.data.map.getAllLayers().forEach((layer: any) => {
      if(layer.values_.layername && layer.values_.location === this.data.location.number){
        this.isochrones.push({layername: layer.values_.layername, location: layer.values_.location, name_location: layer.values_.name_location, ride: layer.values_.ride, time: layer.values_.time, totalsDepartement: layer.values_.totalsDepartement});
        const listener = (event: any) => {
          if (event.key === 'totalsDepartement') {
            this.ngZone.run(() => {
              const idx = this.isochrones.findIndex(i => i.layername === layer.values_.layername);
              if (idx >= 0) {
                this.isochrones[idx] = { ...this.isochrones[idx], totalsDepartement: layer.values_.totalsDepartement };
              }
              this.cdr.markForCheck();
            });
          }
        };
        layer.on('propertychange', listener);
        this.layerListeners.push({ layer, listener });
      }
    });
  }

  ngOnDestroy(){
    this.layerListeners.forEach(({ layer, listener }) => layer.un('propertychange', listener));
    this.layerListeners = [];
  }

  formatNumber(value: any, format: string): string | null {
    if(value){
      return this.decimalPipe.transform(value.replace(',','.'), format);
    } else {
      return "Inconnue";
    }
  }

  formatNumberReal(value: number|null|undefined, format: string): string | null {
    if(value != null && value !== undefined){
      return this.decimalPipe.transform(value, format);
    } else {
      return "Inconnue";
    }
  }
}
