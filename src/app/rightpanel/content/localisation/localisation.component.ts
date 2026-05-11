import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { DsfrTabsModule, DsfrButtonModule, DsfrSearchBarModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';
import { WfsService } from './../../../services/wfs.service';
import { GeocodageService } from './../../../services/geocodage.service';
import { LocalisationInfoComponent } from '../../content/localisation-info/localisation-info.component';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export interface Region {
  id: number;
  name: string;
  number: string;
  departments: Departement[];
}

export interface Departement {
  id: number;
  name: string;
  number: string;
  region: string;
}

export interface Epci {
  id: number;
  name: string;
  number: string;
}

export interface Commune {
  id: number;
  name: string;
  number: string;
}

@Component({
  selector: 'app-localisation',
  standalone: true,
  imports: [DsfrTabsModule, DsfrButtonModule, DsfrSearchBarModule],
  templateUrl: './localisation.component.html',
  styleUrl: './localisation.component.css',
  providers: [WfsService, GeocodageService]
})
export class LocalisationComponent implements OnInit, AfterViewInit {

  constructor(private WfsService: WfsService, private GeocodageService: GeocodageService, private rightpanelService: RightpanelService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  searchResults: any[] = [];
  searchQuery = '';
  searchMessage = '';
  currentTab = "departement";
  departements: Departement[] = [];
  epcis: Epci[] = [];
  communes: Commune[] = [];
  regions: Region[] = [
    {id: 1, name: "Auvergne-Rhône-Alpes", number: "84", departments: []},
    {id: 2, name: "Bourgogne-Franche-Comté", number: "27", departments: []},
    {id: 3, name: "Bretagne", number: "53", departments: []},
    {id: 4, name: "Centre-Val de Loire", number: "24", departments: []},
    {id: 5, name: "Corse", number: "94", departments: []},
    {id: 6, name: "Grand Est", number: "44", departments: []},
    {id: 7, name: "Hauts-de-France", number: "32", departments: []},
    {id: 8, name: "Île-de-France", number: "11", departments: []},
    {id: 9, name: "Normandie", number: "28", departments: []},
    {id: 10, name: "Nouvelle-Aquitaine", number: "75", departments: []},
    {id: 11, name: "Occitanie", number: "76", departments: []},
    {id: 12, name: "Pays de la Loire", number: "52", departments: []},
    {id: 13, name: "Provence-Alpes-Côte d'Azur", number: "93", departments: []},
    {id: 14, name: "Guadeloupe", number: "01", departments: []},
    {id: 15, name: "Martinique", number: "02", departments: []},
    {id: 16, name: "Guyane", number: "03", departments: []},
    {id: 17, name: "La Réunion", number: "04", departments: []},
    {id: 18, name: "Mayotte", number: "06", departments: []}
  ];
  
  private highlightSource = new VectorSource({});
  private highlightDebounceTimer?: ReturnType<typeof setTimeout>;
  private readonly highlightDebounceMs = 100;
  private highlightRequestId = 0;
  private selectionHighlightActive = false;
  private highlightLayer = new VectorLayer({
    //@ts-ignore
    name: "highlight",
    source: this.highlightSource,
    visible: false,
    style: {
      'stroke-color': '#C8191F',
      'stroke-width': 1,
      'fill-color': 'rgba(0, 0, 0, 0.08)'
    },
  });

  /**
   * Initialise la couche de surbrillance et charge la liste des localisations visibles.
   */
  ngOnInit() {
    var self = this;

    var highlightLayerExists = false;
    
    this.data.getLayers().forEach((layer : any) => {
      if (layer.values_?.name === "highlight") {
        layer.getSource().clear();
        highlightLayerExists = true;
      }
    });

    if (!highlightLayerExists) {
      this.data.addLayer(this.highlightLayer);
    } else {
      this.data.getLayers().forEach((layer : any) => {
        if (layer.values_?.name === "highlight") {
          this.highlightLayer = layer;
          this.highlightSource = layer.getSource();
        }
      });
    }

    // On charge une première fois la liste
    self.searchLocations(this.data);

    // Ajout event on moveend de la carte pour charger les listes de localisation
    this.data.on('moveend', function(e: any){
      self.searchLocations(self.data);
    });
  }

  /**
   * Monte le controle de territoire dans le panneau apres rendu du DOM.
   */
  ngAfterViewInit(): void {
    if(this.rightpanelService.territoryControl && this.rightpanelService.territoryControl.element) {
      document.getElementById("territories")!.appendChild(this.rightpanelService.territoryControl.element);
    }
  }

  /**
   * Change l'onglet actif et reinitialise la surbrillance courante.
   */
  changeTab(tab: any) {
    this.currentTab = tab;
    this.selectionHighlightActive = false;
    this.highlightRequestId++;
    if (this.highlightDebounceTimer) {
      clearTimeout(this.highlightDebounceTimer);
      this.highlightDebounceTimer = undefined;
    }
    this.highlightSource.clear();
    this.highlightLayer.setVisible(false);
  }

  /**
   * Selectionne une localisation, zoome dessus et ouvre le panneau d'information.
   */
  selectLocation(selected: any) {
    this.selectionHighlightActive = true;
    this.highlightRequestId++;
    if (this.highlightDebounceTimer) {
      clearTimeout(this.highlightDebounceTimer);
      this.highlightDebounceTimer = undefined;
    }

    let query = selected.name;
    if(this.currentTab == "departement"){
      query = selected.number;
    }
    this.GeocodageService.getAdminExpressGeometry(query, this.currentTab).subscribe({
      next : (response: any) => {
        const locationGeom = new GeoJSON().readFeatures(response.features[0].geometry);
        this.highlightSource.clear();
        this.highlightSource.addFeatures(locationGeom);
        this.highlightLayer.setVisible(true);
        this.data.getView().fit(locationGeom[0].getGeometry(), {padding: [30,30,30,30]});
        if(this.currentTab == "commune"){
          selected.number = response.features[0].properties.code_insee;
        }
        this.rightpanelService.setContent(LocalisationInfoComponent, {map : this.data, location: selected, type: this.currentTab}, "locationinfo");
      },
      error : (error: any) => { console.error('Error fetching location geometry:', error) }
    });
  }

  /**
   * Affiche une surbrillance temporaire sur la localisation survolee.
   */
  highlightLocation(name: any) {
    if (this.selectionHighlightActive) {
      return;
    }

    if (this.highlightDebounceTimer) {
      clearTimeout(this.highlightDebounceTimer);
      this.highlightDebounceTimer = undefined;
    }

    const requestId = ++this.highlightRequestId;
    this.highlightDebounceTimer = setTimeout(() => {
      this.GeocodageService.getAdminExpressGeometry(name, this.currentTab).subscribe({
        next : (response: any) => {
          if (requestId !== this.highlightRequestId) {
            return;
          }

          try {
            const locationGeom = new GeoJSON().readFeatures(response.features[0].geometry);
            this.highlightSource.clear();
            this.highlightSource.addFeatures(locationGeom);
            this.highlightLayer.setVisible(true);
          } catch (e) {
            console.error('Error highlighting location:', e);
          }
        },
        error : (error: any) => { console.error('Error fetching location geometry:', error) }
      });
    }, this.highlightDebounceMs);
  }

  /**
   * Retire la surbrillance temporaire si aucune selection n'est verrouillee.
   */
  unhighlightLocation(name: any) {
    if (this.selectionHighlightActive) {
      return;
    }

    this.highlightRequestId++;
    if (this.highlightDebounceTimer) {
      clearTimeout(this.highlightDebounceTimer);
      this.highlightDebounceTimer = undefined;
    }
    this.highlightSource.clear();
    this.highlightLayer.setVisible(false);
  }

  /**
   * Recharge les listes (departements, EPCI, communes) selon l'emprise et le zoom de la carte.
   */
  searchLocations(e: any) {
    var self = this;

    if(self.rightpanelService.isExpanded && self.rightpanelService.currentView == "location"){
      if (self.currentTab == "epci"){
        if (e.getView().getZoom() > 10){
          self.WfsService.getEpciFromBbox(e.getView().calculateExtent(e.getSize()).toString()).subscribe({
            next : (response: any) => {
                self.epcis = [];
                response.features.forEach( (feature: { properties: { cleabs: any; nom_officiel: any; code_siren: any; }; }) => {
                  self.epcis.push({id: feature.properties.cleabs , name: feature.properties.nom_officiel, number: feature.properties.code_siren });
                });
            },
            error : (error: any) => { console.error('Error fetching epci datas:', error); }
          });
        } else {
          self.epcis = [];
        }
      } else if (self.currentTab == "commune") {
        if (e.getView().getZoom() > 12){
          self.WfsService.getCommuneFromBbox(e.getView().calculateExtent(e.getSize()).toString()).subscribe({
            next : (response: any) => {  
                self.communes = [];
                response.features.forEach( (feature: { properties: { cleabs: any; nom_officiel: any; code_insee_du_departement	: any; }; }) => {
                  self.communes.push({id: feature.properties.cleabs , name: feature.properties.nom_officiel, number: feature.properties.code_insee_du_departement	  });
                });
            },
            error : (error: any) => { console.error('Error fetching commune datas:', error); }
          });
        } else {
          self.communes = [];
        }
      } else {
        self.WfsService.getDepartementFromBbox(e.getView().calculateExtent([e.getSize()[0] * 0.8, e.getSize()[1] * 0.8]).toString()).subscribe({
          next : (response: any) => {  
              self.departements = [];
              self.regions.forEach((region: Region) => {
                region.departments = [];
              });

              response.features.forEach((feature: { properties: { cleabs: any; nom_officiel: any; code_insee: any; code_insee_de_la_region?: any; code_region?: any; }; }) => {
                const rawRegionCode = feature.properties.code_insee_de_la_region ?? feature.properties.code_region;
                const regionCode = String(rawRegionCode ?? '').padStart(2, '0');

                const department: Departement = {
                  id: feature.properties.cleabs,
                  name: feature.properties.nom_officiel,
                  number: String(feature.properties.code_insee ?? ''),
                  region: regionCode
                };

                self.departements.push(department);

                const region = self.regions.find((item: Region) => item.number === regionCode);
                if (region) {
                  const alreadyInRegion = region.departments.some((item: Departement) => item.number === department.number);
                  if (!alreadyInRegion) {
                    region.departments.push(department);
                  }
                }
              });
              self.departements.sort((a: Departement, b: Departement) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
              self.regions.forEach((region: Region) => {
                region.departments.sort((a: Departement, b: Departement) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
              });
              self.regions.sort((a: Region, b: Region) => {
                const countDiff = b.departments.length - a.departments.length;
                return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
              });
              
          },
          error : (error: any) => { console.error('Error fetching departement datas:', error); }
        });
      }
    } 
  }
  /**
   * Met a jour la saisie et alimente la liste de suggestions de recherche.
   */
  searchChange(query: string) {
    this.searchQuery = query;
    this.searchMessage = '';
    if (!query || query.trim().length < 2) {
      this.searchResults = [];
      return;
    }
    this.GeocodageService.searchDepartement(query).subscribe({
      next: (response: any) => {
        this.searchResults = response.features ?? [];
      },
      error: () => { this.searchResults = []; }
    });
  }

  /**
   * Valide la recherche: selection automatique si resultat unique, sinon message d'aide.
   */
  searchSelect(search: string) {
    const query = (search ?? '').trim();
    this.searchQuery = query;

    if (query.length < 3) {
      this.searchResults = [];
      this.searchMessage = 'Veuillez saisir au moins 3 caractères.';
      return;
    }

    this.GeocodageService.searchDepartement(query).subscribe({
      next: (response: any) => {
        const features = response.features ?? [];
        const normalizedQuery = query.toLocaleLowerCase('fr').trim();

        if (features.length === 1) {
          this.selectSearchResult(features[0]);
          this.selectLocation(this.buildLocationFromFeature(features[0]));
          return;
        }

        const exactMatches = features.filter((feature: any) => {
          const toponym = String(feature?.properties?.toponym ?? '');
          const cityCode = String(feature?.properties?.citycode?.[0] ?? '');
          const label = String(feature?.properties?.label ?? '');

          const formattedToponym = cityCode ? `${toponym} (${cityCode})` : toponym;

          return toponym.toLocaleLowerCase('fr').trim() === normalizedQuery
            || formattedToponym.toLocaleLowerCase('fr').trim() === normalizedQuery
            || label.toLocaleLowerCase('fr').trim() === normalizedQuery;
        });

        if (exactMatches.length === 1) {
          this.selectSearchResult(exactMatches[0]);
          this.selectLocation(this.buildLocationFromFeature(exactMatches[0]));
          return;
        }

        this.searchResults = features;
        this.searchMessage = features.length === 0
          ? 'Aucun resultat unique. Veuillez saisir autre chose.'
          : 'Plusieurs resultats trouvés. Veuillez saisir autre chose.';
      },
      error: () => {
        this.searchResults = [];
        this.searchMessage = 'Erreur de recherche. Veuillez réessayer.';
      }
    });
  }

  /**
   * Injecte le resultat choisi dans la barre de recherche et ferme la liste.
   */
  selectSearchResult(feature: any) {
    const toponym = feature?.properties?.toponym ?? '';
    const cityCode = feature?.properties?.citycode?.[0] ?? '';
    this.searchQuery = cityCode ? `${toponym} (${cityCode})` : toponym;
    this.searchResults = [];
    this.searchMessage = '';
  }

  /**
   * Construit l'objet localisation attendu par selectLocation a partir d'une feature.
   */
  private buildLocationFromFeature(feature: any) {
    const toponym = String(feature?.properties?.toponym ?? '');
    const cityCode = String(feature?.properties?.citycode?.[0] ?? '');

    return {
      name: toponym,
      number: cityCode
    };
  }
}